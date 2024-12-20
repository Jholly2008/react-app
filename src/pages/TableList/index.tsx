import {addRule, removeRule, rule, trace, updateRule} from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import {Button, Drawer, Input, message, Tag} from 'antd';
import React, { useRef, useState } from 'react';

import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.TraceInfoItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.TraceInfoItem[]>([]);

  const VERSION = 'v2.0.0';

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.TraceInfoItem>[] = [
    {
      title: "spanId",
      dataIndex: 'spanId',
      tip: 'The spanId is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: "traceId",
      dataIndex: 'traceId',
      valueType: 'textarea',
    },
    {
      title: "parentSpanId",
      dataIndex: 'parentSpanId',
      hideInForm: true,
    },
    {
      title: "serviceName",
      dataIndex: 'serviceName',
      hideInForm: true,
    },
    {
      title: 'serviceVersion',
      dataIndex: 'serviceVersion',
    },
    {
      title: 'startTime',
      dataIndex: 'startTime',
      valueType: 'dateTime',
    },
    {
      title: 'endTime',
      dataIndex: 'endTime',
      valueType: 'dateTime',
    },
    {
      title: 'costTime',
      dataIndex: 'costTime',
    },
    {
      title: 'requestBody',
      dataIndex: 'requestBody',
      hideInTable: true,
    },
    {
      title: 'responseBody',
      dataIndex: 'responseBody',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
    },
  ];

  return (
    <PageContainer extra={[
      <Tag key="version" color="blue">
        Version: {VERSION}
      </Tag>
    ]}>
      <ProTable<API.TraceInfoItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={trace}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.spanId && (
          <ProDescriptions<API.TraceInfoItem>
            column={2}
            title={currentRow?.spanId}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.spanId,
            }}
            columns={columns as ProDescriptionsItemProps<API.TraceInfoItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
