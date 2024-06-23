import React, { useState } from 'react';
import { Form, Input, Button, Rate } from 'antd';

const ReviewForm = ({ bookId, onReviewSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const review = {
      rating: values.rating,
      comment: values.comment,
    };
    onReviewSubmit(review);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="rating"
        label="Rating"
        rules={[{ required: true, message: 'Please select a rating' }]}
      >
        <Rate />
      </Form.Item>
      <Form.Item
        name="comment"
        label="Comment"
        rules={[{ required: true, message: 'Please enter your comment' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit Review</Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;
