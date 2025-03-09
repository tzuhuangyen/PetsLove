import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { IoWarningOutline } from 'react-icons/io5';

function ProductOtherDetailOther() {
  return (
    <>
      {/* <!-- 注意事項內頁 --> */}

      {/* <!-- 運送付款內頁 --> */}

      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='1'>
          {/* <!-- notice --> */}

          <Accordion.Header>
            <IoWarningOutline size={25} color='red' className='me-1' />
            Notice & Warning
          </Accordion.Header>
          <Accordion.Body>
            <h3 className='card-title mb-3 text-center'>餵食小提醒</h3>

            <p>
              若毛孩為初次品嚐／狼吞虎嚥／老犬(牙口沒那麼好)類型，餵食時請在旁隨時留意狀況，避免毛孩直接吞食。
              本商品可作為訓練或獎勵毛孩時食用，切忌過量，避免造成毛孩腸餵不適。
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          {/* <!-- 有效期限 --> */}
          <Accordion.Header>Expired & how to storage</Accordion.Header>
          <Accordion.Body>
            <div className='card-body text-center p-0'>
              <h3 className='card-title mb-3'>有效期限</h3>
              <h4>未拆封</h4>
              <ul className='list-unstyled'>
                <li>常溫7-10天(建議不要)</li>
                <li>冷藏30天(退冰10分鐘)</li>
                <li>冷凍90天(退冰30分鐘)</li>
              </ul>
              <h4>拆封後</h4>
              <ul className='list-unstyled'>
                <li>夾鏈袋/密封保存</li>
                <li>有效期限約3-4天</li>
                <li>以冷藏方式保存並盡快餵食完畢</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='3'>
          {/* <!-- 運送方式 --> */}
          <Accordion.Header>Delivery</Accordion.Header>
          <Accordion.Body>
            <div className='card-body'>
              <ul>
                <li>工作室取貨：高雄市 三民區 中山公園</li>
                <li>超商取貨：7-ELEVEN / 全家便利店 / 萊爾富</li>
                <li>零食黑貓常溫宅配</li>
                <li>蛋糕黑貓冷凍宅配</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {/* <!-- pay --> */}
        <Accordion.Item eventKey='4'>
          <Accordion.Header>Payment</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>Collect & pay </li>
              <li>Bank transfer / credit card</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default ProductOtherDetailOther;
