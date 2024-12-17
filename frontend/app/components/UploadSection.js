import React, { useState } from "react";
import { Upload, Button, List, Spin, message } from "antd";
import UploadIcon from "@/public/icon/UploadIcon";
import BinIcon from "@/public/icon/BinIcon";
import ClipIcon from "@/public/icon/ClipIcon";
import WarningIcon from "@/public/icon/WarnningIcon";
import PrimaryButton from "./PrimaryButton";

const UploadSection = () => {
    // const [uploadedFiles, setUploadedFiles] = useState([
    //     { key: "1", name: "ข้อสอบการเงินของนายชาย", time: "11:00AM", date: "10 พ.ย. 2567", status: "ใหม่" },
    //     { key: "2", name: "ข้อสอบการเงินของนางฉลา", time: "10:55AM", date: "10 พ.ย. 2567", status: "อัปโหลดแล้ว" },
    // ]);

    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const handleUpload = (info) => {
        const { file } = info;
        setIsLoading(true);

        if (file.status === "done") {
            const newFile = {
                key: Date.now().toString(),
                name: file.name,
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString(),
                status: "ใหม่",
            };
            setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
            message.success(`${file.name} อัปโหลดสำเร็จแล้ว`);
            setIsLoading(false);
        } else if (file.status === "error") {
            message.error(`${file.name} อัปโหลดไม่สำเร็จ`);
            setIsLoading(false);
        }
    };

    const handleDelete = (key) => {
        setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.key !== key));
        message.success("ลบไฟล์เรียบร้อยแล้ว");
    };

    const renderDraggerArea = () => {
        return (
            <div
                style={{
                    margin: "8px 12px 12px 12px",
                    textAlign: "center",
                    height: 100
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        margin: "96px"
                    }}
                >
                    <ClipIcon />
                    <p>
                        <span
                            style={{
                                fontWeight: 400,
                                fontFamily: "Outfit",
                                fontSize: "15px",
                                color: "#14202E66"
                            }}
                        >
                            คลิกเพื่อเพิ่มไฟล์
                        </span>
                        <span
                            style={{
                                fontWeight: 400,
                                fontFamily: "Outfit",
                                fontSize: "12px",
                                padding: "0 4px",
                                color: "#B0B0B0CC"
                            }}
                        >
                            หรือ
                        </span>
                        <span
                            style={{
                                fontWeight: 400,
                                fontFamily: "Outfit",
                                fontSize: "15px",
                                color: "#14202E66"
                            }}
                        >
                            ลากไฟล์มาได้เลย
                        </span>
                    </p>
                </div>

            </div>
        )
    }

    return (
        <div style={{ padding: "32px", backgroundColor: '#FBFCFE', borderRadius: "8px" }}>
            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    lineHeight: "32px",
                    marginBottom: "4px",
                }}
            >
                <UploadIcon />
                <span
                    style={{
                        fontWeight: 600,
                        fontFamily: "Outfit",
                        fontSize: "28px",
                    }}
                >
                    อัพโหลดไฟล์ของคุณ
                </span>
            </div>
            <div
                style={{
                    marginBottom: "16px",
                }}
            >
                <span
                    style={{
                        fontWeight: 500,
                        fontFamily: "Outfit",
                        fontSize: "13px",
                        lineHeight: "16px",
                        color: "#818181",
                    }}
                >
                    คุณสามารถอัพโหลดไฟล์ข้อสอบที่ต้องการตรวจสอบ
                </span>
            </div>
            <Spin
                spinning={isLoading}
            >
                <Upload.Dragger
                    multiple
                    showUploadList={false}
                    customRequest={({ file, onSuccess }) => {
                        setTimeout(() => onSuccess("ok"), 1000);
                    }}
                    onChange={handleUpload}
                    accept=".jpg,.jpeg,.png,.heic,.pdf"
                    style={{ background: "#FBFCFE", borderRadius: "8px" }}
                >
                    {uploadedFiles.length > 0
                        ? (
                            <>
                                <List
                                    dataSource={uploadedFiles}
                                    itemLayout="horizontal"
                                    style={{
                                        margin: "12px 12px 8px 12px",
                                        backgroundColor: '#FBFCFE',
                                        textAlign: "left"
                                    }}
                                    renderItem={(item, index) => (
                                        <List.Item
                                            actions={[
                                                <div
                                                    style={{ display: "flex", gap: "20px", alignItems: "center" }}
                                                >
                                                    <div>
                                                        <span style={{
                                                            fontWeight: 500,
                                                            fontSize: "16px",
                                                            padding: "17.6px 10px",
                                                            color: "#000000"
                                                        }}>
                                                            {item.time}
                                                        </span>
                                                        <span
                                                            style={{
                                                                fontWeight: 500,
                                                                color: "#EBEBEB"
                                                            }}
                                                        >
                                                            |
                                                        </span>
                                                        <span style={{
                                                            fontWeight: 500,
                                                            fontSize: "16px",
                                                            padding: "17.6px 10px",
                                                            color: "#000000"
                                                        }}>
                                                            {item.date}
                                                        </span>
                                                    </div>
                                                    <Button
                                                        type="text"
                                                        style={{ paddingBottom: "7px", border: "none" }}
                                                        icon={<BinIcon />}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            handleDelete(item.key);
                                                        }}
                                                        danger
                                                    />
                                                </div>
                                            ]}
                                        >
                                            <div>
                                                <span style={{
                                                    fontWeight: 500,
                                                    fontSize: "15px",
                                                    padding: "17.6px 25.5px"
                                                }}>
                                                    {index + 1}
                                                </span>
                                                <span style={{
                                                    fontWeight: 400,
                                                    fontSize: "16px",
                                                    padding: "17.6px 10px"
                                                }}>
                                                    {item.name}
                                                </span>
                                            </div>

                                        </List.Item>
                                    )}
                                />
                                {renderDraggerArea()}
                            </>

                        )
                        : renderDraggerArea()
                    }
                </Upload.Dragger>
            </Spin>
            <div
                style={{
                    marginTop: "24px",
                    display: "flex",
                    gap: "4px",
                }}
            >
                <WarningIcon />
                <p
                    style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#919191",
                    }}
                >
                    หมายุเหตุ : ไฟล์ที่คุณสามารถอัพโหลดได้ สามารถเป็น รูปภาพ (JPEG, PNG หรือ HEIC) หรือ ไฟล์เอกสาร (PDF)
                </p>
            </div>
            <div
                style={{
                    marginTop: "36px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <p
                    style={{
                        fontSize: "20px",
                        fontWeight: 400,
                        color: "#008542",
                    }}
                >
                    ต้องการแก้ไขเกณฑ์คะแนนของคุณไหม?
                    <span
                        style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#008542",
                            textDecoration: "underline",
                            cursor: "pointer",
                            marginLeft: "16px"
                        }}
                    >
                        ดูคะแนนแบบเกณฑ์ทั้งหมด
                    </span>
                </p>
                <PrimaryButton text="ถัดไป" padding="8px 49px" />
            </div>
        </div>
    );
};

export default UploadSection;