'use client';

import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import useHome from './useHome';

const { Title, Paragraph } = Typography;

const HomePage = () => {

  const { reason, score, isloading, analyze} = useHome();
  const [form] = Form.useForm();

  return (
    <Card style={{ width: '80%', margin: 'auto', marginTop: '50px' }}>
      <Form
        onFinish={analyze}
        form={form}
        layout="vertical"
      >
        <Form.Item 
          label="Question"
          name="question"
          rules={[
            {
              required: true,
            },
          ]}
          >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item 
          label="Answer"
          name="answer"
          rules={[
            {
              required: true,
            },
          ]}
          >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit' block loading={isloading}>Analyze</Button>
        </Form.Item>
      </Form>

      {score !== null && reason !== null && (
        <Card style={{ marginTop: '20px' }}>
          <Title level={3}>Analyzed Result</Title>
          <Paragraph><strong>Score:</strong> {score}</Paragraph>
          <Paragraph><strong>Reason:</strong> {reason}</Paragraph>
        </Card>
      )}
    </Card>
  );
};

export default HomePage;