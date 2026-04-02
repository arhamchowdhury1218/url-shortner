import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Form, Input, Button, Card, Typography, Divider, Steps } from "antd";
import {
    MailOutlined,
    LockOutlined,
    LinkOutlined,
    UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => reset("password", "password_confirmation");
    }, []);

    const handleSubmit = () => {
        post(route("register"));
    };

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
            <Head title="Register" />

            <div style={{ width: "100%", maxWidth: 440 }}>
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
                        Create your free account
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
                        Get Started 🚀
                    </Title>
                    <Text
                        type="secondary"
                        style={{
                            display: "block",
                            textAlign: "center",
                            marginBottom: 32,
                        }}
                    >
                        Fill in the details below to create your account
                    </Text>

                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        size="large"
                    >
                        <Form.Item
                            label="Full Name"
                            validateStatus={errors.name ? "error" : ""}
                            help={errors.name}
                        >
                            <Input
                                prefix={
                                    <UserOutlined
                                        style={{ color: "#667eea" }}
                                    />
                                }
                                placeholder="Full Name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                style={{ borderRadius: 8 }}
                            />
                        </Form.Item>

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
                                placeholder="Min. 8 characters"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                style={{ borderRadius: 8 }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            validateStatus={
                                errors.password_confirmation ? "error" : ""
                            }
                            help={errors.password_confirmation}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined
                                        style={{ color: "#667eea" }}
                                    />
                                }
                                placeholder="Repeat your password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                style={{ borderRadius: 8 }}
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 16, marginTop: 8 }}>
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
                                Create Account
                            </Button>
                        </Form.Item>

                        <Divider style={{ margin: "16px 0" }}>
                            <Text type="secondary" style={{ fontSize: 13 }}>
                                Already have an account?
                            </Text>
                        </Divider>

                        <Link href={route("login")}>
                            <Button
                                block
                                style={{
                                    height: 48,
                                    borderRadius: 8,
                                    fontSize: 15,
                                    fontWeight: 500,
                                }}
                            >
                                Sign In Instead
                            </Button>
                        </Link>
                    </Form>
                </Card>

                <Text
                    style={{
                        display: "block",
                        textAlign: "center",
                        marginTop: 24,
                        color: "rgba(255,255,255,0.7)",
                        fontSize: 13,
                    }}
                >
                    By registering, you agree to our Terms of Service
                </Text>
            </div>
        </div>
    );
}
