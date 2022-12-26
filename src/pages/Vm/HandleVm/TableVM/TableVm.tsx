import React from 'react';
import { Collapse, List } from 'antd';
import './tableVm.scss';
import { data } from './Data';

const { Panel } = Collapse;

const TableContent: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className="wrapper_content">
      <div className="table_content1">
        <div className="item_table">
          <Collapse onChange={onChange} style={{ boxShadow: '1px 1px 4px 0 rgb(0 0 0 / 10%)' }}>
            <Panel header="VM HardWare" key="1">
              <Collapse defaultActiveKey="1">
                <Panel header="CPU" key="1">
                  <List
                    size="small"
                    dataSource={data.slice(0, 4)}
                    renderItem={item => (
                      <List.Item key={item.key}>
                        <div>{item.title}</div>
                        <div>{item.content}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
                <Panel header="Memory" key="2">
                  <List
                    size="small"
                    dataSource={data.slice(4, 6)}
                    renderItem={item => (
                      <List.Item key={item.key}>
                        <div>{item.title} </div>
                        <div>{item.content}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
                <Panel header="Order" key="3">
                  <List
                    size="small"
                    dataSource={data.slice(6)}
                    renderItem={item => (
                      <List.Item key={item.key}>
                        <div>{item.title} </div>
                        <div>{item.content}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
            </Panel>
          </Collapse>
        </div>
        <div className="item_table">
          <Collapse collapsible="header" defaultActiveKey={['1']}>
            <Panel header="Compute Policies" key="1">
              <a href="#">View all policies</a>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div className="table_content2">
        <div className="item_table">
          <Collapse collapsible="header" defaultActiveKey={['1']}>
            <Panel header="Notes" key="1">
              <span style={{ opacity: 0.4 }}>Edit Notes...</span>
            </Panel>
          </Collapse>
        </div>
        <div className="item_table">
          <Collapse collapsible="header" defaultActiveKey={['1']}>
            <Panel header="Custom Attributes" key="1">
              <p>Edit...</p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default TableContent;
