import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Form,
    Input,
    Button,
    Checkbox,
    Card,
    Typography,
    Divider,
    message,
} from "antd";
import { MailOutlined, LockOutlined, LinkOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => reset("password");
    }, []);

    const handleSubmit = () => {
        post(route("login"));
    };

    if (status) message.success(status);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
        >
            <Head title="Log In" />

            <div style={{ width: "100%", maxWidth: 420 }}>
                {/* Logo / Brand */}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: "white",
                            marginBottom: 16,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        }}
                    >
                        <LinkOutlined
                            style={{ fontSize: 28, color: "#667eea" }}
                        />
                    </div>
                    <Title level={2} style={{ color: "white", margin: 0 }}>
                        URL Shortener
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.8)" }}>
                        Sign in to manage your links
                    </Text>
                </div>

                {/* Card */}
                <Card
                    style={{
                        borderRadius: 16,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                        border: "none",
                    }}
                    styles={{ body: { padding: "40px" } }}
                >
                    <Title
                        level={3}
                        style={{
                            textAlign: "center",
                            marginBottom: 8,
                            color: "#1a1a2e",
                        }}
                    >
                        Welcome Back 👋
                    </Title>
                    <Text
                        type="secondary"
                        style={{
                            display: "block",
                            textAlign: "center",
                            marginBottom: 32,
                        }}
                    >
                        Enter your credentials to continue
                    </Text>

                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        size="large"
                    >
                        <Form.Item
                            label="Email Address"
                            validateStatus={errors.email ? "error" : ""}
                            help={errors.email}
                        >
                            <Input
                                prefix={
                                    <MailOutlined
                                        style={{ color: "#667eea" }}
                                    />
                                }
                                placeholder="you@example.com"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                style={{ borderRadius: 8 }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            validateStatus={errors.password ? "error" : ""}
                            help={errors.password}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined
                                        style={{ color: "#667eea" }}
                                    />
                                }
                                placeholder="Enter your password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                style={{ borderRadius: 8 }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Checkbox
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                >
                                    Remember me
                                </Checkbox>
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        style={{ color: "#667eea" }}
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 16 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={processing}
                                block
                                style={{
                                    height: 48,
                                    borderRadius: 8,
                                    background:
                                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    border: "none",
                                    fontSize: 16,
                                    fontWeight: 600,
                                }}
                            >
                                Sign In
                            </Button>
                        </Form.Item>

                        <Divider style={{ margin: "16px 0" }}>
                            <Text type="secondary" style={{ fontSize: 13 }}>
                                Don't have an account?
                            </Text>
                        </Divider>

                        <Link href={route("register")}>
                            <Button
                                block
                                style={{
                                    height: 48,
                                    borderRadius: 8,
                                    fontSize: 15,
                                    fontWeight: 500,
                                }}
                            >
                                Create an Account
                            </Button>
                        </Link>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
