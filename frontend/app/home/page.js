'use client';

import React from 'react';
import { Col, Row } from 'antd';
import PrimaryButton from '../components/PrimaryButton';
import PowerByIcon from '@/public/icon/PowerByIcon';
import Image from 'next/image';
import useHome from './useHome';

const HomePage = () => {

  const { router } = useHome();

  return (
    <>
      <div style={{ zIndex: 99, position: 'relative' }}>
        <Row style={{ height: '100vh' }}>
          <Col span={12} style={{ backgroundColor: 'white' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <div
                style={{ paddingLeft: '80px' }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 64,
                    fontFamily: 'IBM Plex Sans Thai',
                    lineHeight: '96px'
                  }}>
                  ระบบตรวจอัจฉริยะ
                </p>

                <p
                  style={{
                    fontWeight: 400,
                    fontSize: 24,
                    fontFamily: 'IBM Plex Sans Thai',
                    color: '#1B2128',
                    lineHeight: '39.6px'
                  }}
                >
                  ระบบตรวจข้อสอบอัจฉริยะ ใช้งานง่าย แม่นยำ รวดเร็ว  <br />
                  พร้อมปรับเกณฑ์ได้ตามต้องการ ด้วยพลังปัญญาประดิษฐ์
                </p>
                <div
                  style={{
                    marginTop: '32px',
                    display: 'flex',
                    gap: '8px'
                  }}
                >
                  <PrimaryButton text="เริ่มต้นใช้งาน" onClick={() => router.push('/examinationchecker')}/>
                  <p
                    style={{
                      padding: '10px 18px',
                      color: '#666666',
                      fontWeight: 400,
                      fontFamily: "IBM Plex Sans Thai",
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                  >
                    ดูรายละเอียดเพิ่มเติม
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <Image
              src="/images/bg.png"
              alt="Picture"
              layout="fill"
              style={{ objectFit: 'cover', width: '100%' }}
            />
          </Col>
        </Row>
        <div style={{ position: 'fixed', bottom: '0', width: '100%', marginBottom: '42px', marginLeft: '80px' }}>
          <PowerByIcon />
        </div>
      </div>
    </>

  );
};

export default HomePage;