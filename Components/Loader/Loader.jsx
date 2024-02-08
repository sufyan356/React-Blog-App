
import {Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
  return (
    <div className="loader">
        {/* <Spin /> */}
        <Spin indicator={<LoadingOutlined style={{ fontSize: 34 }} spin />} />

    </div>
  )
}

export default Loader