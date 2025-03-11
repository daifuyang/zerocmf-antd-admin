import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from 'umi';
import Media from './components/media';

import './media.less';

const tabList = [
  {
    key: 'image',
    tab: '图片',
  },
  {
    key: 'audio',
    tab: '音频',
  },
  {
    key: 'video',
    tab: '视频',
  },
  {
    key: 'file',
    tab: '附件',
  },
];

type TabKey = 'image' | 'audio' | 'video' | 'file';

const tabMap: Record<TabKey, 0 | 1 | 2 | 3> = {
  image: 0,
  audio: 1,
  video: 2,
  file: 3,
};

const Assets = () => {
  const [tabKey, setTabKey] = useState<TabKey>('image');
  const { setInitialState } = useModel('@@initialState');

  const onTabChange = (tab: any) => {
    setTabKey(tab);
  };

  useEffect(() => {
    setInitialState((prev) => ({
      ...prev,
      fullLayout: true,
    }));

    return () => {
      setInitialState((prev) => ({
        ...prev,
        fullLayout: false,
      }));
    };
  }, []);

  console.log('tabKey', tabKey, tabMap[tabKey]);

  return (
    <PageContainer tabList={tabList} tabActiveKey={tabKey} onTabChange={onTabChange}>
      <Card>
        <Media type={tabMap[tabKey]} />
      </Card>
    </PageContainer>
  );
};

export default Assets;
