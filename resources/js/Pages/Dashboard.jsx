import { useEffect, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import relativeTime from "dayjs/plugin/relativeTime";
import {
    Table,
    Button,
    Space,
    Modal,
    Form,
    Input,
    DatePicker,
    message,
    Popconfirm,
    Tag,
    Tooltip,
    Typography,
    Card,
    Row,
    Col,
    Statistic,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    CopyOutlined,
    LinkOutlined,
    BarChartOutlined,
} from "@ant-design/icons";

dayjs.extend(isSameOrBefore);
dayjs.extend(relativeTime);

const { Text, Link } = Typography;

export default function Dashboard({ urls, baseUrl }) {
    const { flash } = usePage().props;
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingUrl, setEditingUrl] = useState(null);
    useEffect(() => {
        const handleFocus = () => router.reload({ only: ["urls"] });
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, []);
    const [createForm] = Form.useForm();
    const [editForm] = Form.useForm();

    // Show flash messages
    if (flash?.success) message.success(flash.success);
    if (flash?.error) message.error(flash.error);

    const getShortUrl = (record) => {
        const code = record.custom_code || record.short_code;
        return `${baseUrl}/${code}`;
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        message.success("Copied to clipboard!");
    };

    const handleCreate = (values) => {
        router.post(
            "/urls",
            {
                ...values,
                expires_at: values.expires_at
                    ? values.expires_at.format("YYYY-MM-DD HH:mm:ss")
                    : null,
            },
            {
                onSuccess: () => {
                    setCreateOpen(false);
                    createForm.resetFields();
                },
                onError: (errors) => {
                    Object.values(errors).forEach((e) => message.error(e));
                },
            },
        );
    };

    const handleEdit = (values) => {
        router.put(
            `/urls/${editingUrl.id}`,
            {
                ...values,
                expires_at: values.expires_at
                    ? values.expires_at.format("YYYY-MM-DD HH:mm:ss")
                    : null,
            },
            {
                onSuccess: () => {
                    setEditOpen(false);
                    editForm.resetFields();
                },
                onError: (errors) => {
                    Object.values(errors).forEach((e) => message.error(e));
                },
            },
        );
    };

    const handleDelete = (id) => {
        router.delete(`/urls/${id}`);
    };

    const openEdit = (record) => {
        setEditingUrl(record);
        editForm.setFieldsValue({
            original_url: record.original_url,
            custom_code: record.custom_code || "",
            expires_at: record.expires_at ? dayjs(record.expires_at) : null,
        });
        setEditOpen(true);
    };

    const columns = [
        {
            title: "Original URL",
            dataIndex: "original_url",
            key: "original_url",
            ellipsis: true,
            render: (url) => (
                <Tooltip title={url}>
                    <Link
                        href={url}
                        target="_blank"
                        style={{ maxWidth: 250, display: "block" }}
                    >
                        {url}
                    </Link>
                </Tooltip>
            ),
        },
        {
            title: "Short URL",
            key: "short_url",
            render: (_, record) => (
                <Space>
                    <Link href={getShortUrl(record)} target="_blank">
                        {getShortUrl(record)}
                    </Link>
                    <Tooltip title="Copy to clipboard">
                        <Button
                            size="small"
                            icon={<CopyOutlined />}
                            onClick={() => copyToClipboard(getShortUrl(record))}
                        />
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: "Clicks",
            dataIndex: "click_count",
            key: "click_count",
            align: "center",
            render: (count) => <Tag color="blue">{count}</Tag>,
        },
        {
            title: "Expires",
            dataIndex: "expires_at",
            key: "expires_at",
            align: "center",
            render: (date) =>
                date ? (
                    <Tag
                        color={dayjs(date).isBefore(dayjs()) ? "red" : "green"}
                    >
                        {dayjs(date).format("MMM D, YYYY")}
                    </Tag>
                ) : (
                    <Tag>Never</Tag>
                ),
        },
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
            render: (date) => dayjs(date).format("MMM D, YYYY"),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => openEdit(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete this URL?"
                        description="This action cannot be undone."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} size="small" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const urlForm = (form, onFinish) => (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                name="original_url"
                label="Original URL"
                rules={[
                    { required: true, message: "Please enter a URL" },
                    { type: "url", message: "Please enter a valid URL" },
                ]}
            >
                <Input
                    prefix={<LinkOutlined />}
                    placeholder="https://example.com/very-long-url"
                />
            </Form.Item>
            <Form.Item
                name="custom_code"
                label="Custom Code (optional)"
                extra="Letters, numbers, dashes only. Minimum 3 characters."
                rules={[
                    {
                        min: 3,
                        message: "Custom code must be at least 3 characters",
                    },
                    {
                        pattern: /^[a-zA-Z0-9_-]+$/,
                        message:
                            "Only letters, numbers, dashes and underscores allowed",
                    },
                ]}
            >
                <Input
                    placeholder="my-custom-link"
                    addonBefore={`${baseUrl}/`}
                />
            </Form.Item>
            <Form.Item name="expires_at" label="Expiry Date (optional)">
                <DatePicker
                    showTime
                    style={{ width: "100%" }}
                    placeholder="Select expiry date"
                    disabledDate={(d) => d && d < dayjs().startOf("day")}
                />
            </Form.Item>
        </Form>
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My URLs
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 px-4 max-w-7xl mx-auto">
                {/* Stats Row */}
                <Row gutter={16} className="mb-6">
                    <Col xs={24} sm={12} md={8}>
                        <Card className="mb-4">
                            <Statistic
                                title="Total URLs"
                                value={urls.total}
                                prefix={<LinkOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card className="mb-4">
                            <Statistic
                                title="Total Clicks"
                                value={urls.data.reduce(
                                    (sum, u) => sum + u.click_count,
                                    0,
                                )}
                                prefix={<BarChartOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Create Button */}
                <div className="mb-4 flex justify-end">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => setCreateOpen(true)}
                    >
                        Shorten New URL
                    </Button>
                </div>

                {/* URL Table */}
                <Card>
                    <Table
                        dataSource={urls.data}
                        columns={columns}
                        rowKey="id"
                        scroll={{ x: 800 }}
                        pagination={{
                            current: urls.current_page,
                            pageSize: urls.per_page,
                            total: urls.total,
                            showTotal: (total) => `Total ${total} URLs`,
                            onChange: (page) =>
                                router.get("/dashboard", { page }),
                            showSizeChanger: false,
                        }}
                    />
                </Card>
            </div>

            {/* Create Modal */}
            <Modal
                title="Shorten a New URL"
                open={createOpen}
                onCancel={() => {
                    setCreateOpen(false);
                    createForm.resetFields();
                }}
                onOk={() => createForm.submit()}
                okText="Create"
                destroyOnClose
            >
                {urlForm(createForm, handleCreate)}
            </Modal>

            {/* Edit Modal */}
            <Modal
                title="Edit URL"
                open={editOpen}
                onCancel={() => {
                    setEditOpen(false);
                    editForm.resetFields();
                }}
                onOk={() => editForm.submit()}
                okText="Save Changes"
                destroyOnClose
            >
                {urlForm(editForm, handleEdit)}
            </Modal>
        </AuthenticatedLayout>
    );
}
