'use client';

import { React } from 'react';

import { Layout, ConfigProvider } from 'antd';

import { ExamLogoActive, ExamLogo } from '@/public/icon/ExamLogo';
import { GraphIconActive, GraphIcon } from '@/public/icon/GraphIcon';
import { SettingIconActive, SettingIcon } from '@/public/icon/SettingIcon';
import { ProfileIcon, ProfileIconActive } from '@/public/icon/ProfileIcon';
import LogoIcon from '@/public/icon/logoIcon';
import UploadSection from '../components/UploadSection';
import SiderButton from '../components/SiderButton';

const { Sider, Content } = Layout;

function ExaminationCheckerPage() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: '#F5FAF7',
            bodyBg: '#FBFCFE',
          }
        },
        token: {
          fontFamily: "IBM Plex Sans Thai"
        }
      }
      }
    >
      <Layout>
        <Sider
          style={{ height: '100vh' }}
          width={214}
        >
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '27.5px 22px',
              borderBottom: '1px solid #62C5541C',
            }}
          >
            <LogoIcon/>
            <p
              style={{
                fontSize: '20px',
                fontFamily: 'Reddit Sans',
                fontWeight: 700,
                color: '#008542',
              }}
            >
              IntelliGrade
            </p>
          </div>


          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '12px',
              alignItems: 'center',
              gap: '8px',
              height: '100%' 
            }}
          >
            <SiderButton
              text="ตรวจข้อสอบ"
              active={true}
              Icon={<ExamLogo />}
              activeIcon={<ExamLogoActive />}
            />

            <SiderButton
              text="ภาพรวม"
              active={false}
              Icon={<GraphIcon />}
              activeIcon={<GraphIconActive />}
            />

            <SiderButton
              text="ตั้งค่า"
              active={false}
              Icon={<SettingIcon />}
              activeIcon={<SettingIconActive />}
            />

            <SiderButton
              text="โปรไฟล์"
              active={false}
              Icon={<ProfileIcon />}
              activeIcon={<ProfileIconActive />}
            />
          </div>
        </Sider>
        <Content>
          <div
            style={{
              margin: '40px',
              backgroundColor: '#FBFCFE',
              borderRadius: '24px',
              boxShadow: '0px 0px 10px 0px #706BDB1A',
            }}
          >
            <UploadSection />
          </div>
        </Content>
      </Layout>

    </ConfigProvider>
  )
};


export default ExaminationCheckerPage;