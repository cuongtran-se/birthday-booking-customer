"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Form, Input, Modal, Popconfirm, Space, Table, Typography } from "antd";

const { Title } = Typography;
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createInquiry,
  getAllInquiryByAuthor,
  updateInquiry,
} from "@/lib/features/action/inquiry.action";

interface Item {
  key: string;
  id: number;
  inquiryNumber: string;
  inquiryQuestion: string;
  inquiryReply: string;
  status: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState("");
  const [removingKey, setRemovingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;
  const isRemoving = (record: Item) => record.key === removingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ inquiryReply: "", status: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id: number) => {
    try {
      const row = (await form.validateFields()) as Item;
      if (row) {
        await updateOneInquiry({
          id,
          payload: {
            inquiryQuestion: row?.inquiryQuestion,
          },
        }).then((res) => {
          setEditingKey("");
        });
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const removeOne = async (id: number) => {
    try {
      // await deleteOneInquiry(id)
      setEditingKey("");
    } catch (errInfo) {
      console.log("Error", errInfo);
    }
  };

  const columns = [
    {
      title: "Inquiry No.",
      dataIndex: "inquiryNumber",
      width: "10%",
      editable: false,
    },
    {
      title: "Question",
      dataIndex: "inquiryQuestion",
      width: "25%",
      editable: true,
    },
    {
      title: "Reply",
      dataIndex: "inquiryReply",
      width: "40%",
      editable: false,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      editable: false,
      render: (_: any, record: Item) => {
        return (
          <Badge
            status={
              record?.status === "PENDING"
                ? "processing"
                : record?.status === "APPROVED"
                  ? "success"
                  : "error"
            }
            text={
              record?.status.charAt(0).toUpperCase() +
              record?.status.toLowerCase().slice(1)
            }
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Typography.Link onClick={() => save(record?.id)}>
              Save
            </Typography.Link>
            <Typography.Link onClick={() => cancel()}>Cancel</Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => removeOne(record?.id)}
            >
              <a>Delete</a>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            {record?.status === "PENDING" && (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
            )}

            <Typography.Link onClick={() => null}>View</Typography.Link>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    console.log(col.dataIndex);
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "inquiryNumber" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // ** Modal Display
  const [loadingModal, setLoadingModal] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoadingModal(true);
    createOneInquiry();
    setTimeout(() => {
      setLoadingModal(false);
      setOpen(false);
    }, 1);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // ** Dispatch API
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.inquiryReducer.loading);
  const inquiryList = useAppSelector(
    (state) => state.inquiryReducer.inquiryList,
  );
  const inquiryListView: Item[] = [];
  const [inquiryQuestion, setInquiryQuestion] = useState("");

  const fetchAllInquiry = async () => {
    await dispatch(getAllInquiryByAuthor()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  console.log("Mảng của tôi", inquiryListView);
  useEffect(() => {
    fetchAllInquiry();
  }, []);

  useEffect(() => {
    inquiryList?.map((inquiry: any, index: number) => {
      inquiryListView.push({
        key: index.toString(),
        id: inquiry?.id,
        inquiryNumber: (index + 1).toString(),
        inquiryQuestion: inquiry?.inquiryQuestion,
        inquiryReply: inquiry?.inquiryReply,
        status: inquiry?.status,
      });
    });
    setData(inquiryListView);
  }, [inquiryList]);

  const createOneInquiry = async () => {
    await dispatch(createInquiry({ inquiryQuestion })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        fetchAllInquiry();
      }
    });
  };

  // const deleteOneInquiry = async (id: number) => {
  //   await dispatch(deleteInquiry(id)).then(async res => {
  //     if (res?.meta?.requestStatus === 'fulfilled') {
  //       await fetchAllInquiry()
  //     }
  //   })
  // }

  const updateOneInquiry = async (request: {
    id: number;
    payload: { inquiryQuestion: string };
  }) => {
    await dispatch(
      updateInquiry({ id: request.id, payload: request.payload }),
    ).then(async (res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        await fetchAllInquiry();
      }
    });
  };

  return (
    <div className="container mx-auto">
      <Title>Inquiry Form</Title>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
        <Button type="primary" onClick={showModal}>
          Create inquiry
        </Button>
        <Button loading={loading} type="default" onClick={fetchAllInquiry}>
          Refresh
        </Button>
        <Modal
          open={open}
          title="Write inquiry"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loadingModal}
              onClick={handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <Input.TextArea
            onChange={(e) => setInquiryQuestion(e.target.value)}
          />
        </Modal>
      </div>
      <Form form={form} component={false}>
        <Table
          style={{ marginTop: 10 }}
          loading={loading}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default App;
