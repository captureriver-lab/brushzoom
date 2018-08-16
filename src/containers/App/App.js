import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import AppStyle from './AppStyle';
import BrushZoom from '../Chart/BrushZoom';
import { actions as statsActions } from '../../redux/reducers/stats/actions';



const { Header, Content, Footer } = Layout;

import { DatePicker } from 'antd';
import moment from 'moment';

const RangePicker = DatePicker.RangePicker;

function onChange(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

const dateFormat = "YYYY-MM-DD HH:mm:ss"
const DPicker = ({date_range, dispatchDateRange}) => (<div>
  <RangePicker
    defaultValue={[moment(date_range.from, dateFormat), moment(date_range.to, dateFormat)]}

    ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
    showTime
    format={dateFormat}
    onOk={(dates) => {
      console.log('From: ', dates[0].format("YYYY-MM-DDTHH:mm:ss"), ', to: ', dates[1].format("YYYY-MM-DDTHH:mm:ss"));
      dispatchDateRange({from: dates[0].format("YYYY-MM-DDTHH:mm:ss"), to: dates[1].format("YYYY-MM-DDTHH:mm:ss")})
    }}
  />
</div>)

const ConnectedRangePicker = connect(({Stats}) => ({date_range: Stats.date_range}), dispatch => ({
  dispatchDateRange: (payload) => dispatch({type: statsActions.SET_DATE_RANGE, payload})
}))(DPicker)

export class App extends Component {
  render() {
    const appHeight = window.innerHeight;
    return (
              <Layout>
                <Layout>
                  <Layout>
                    <Content>
                      <BrushZoom width={960} height={500} />
                    </Content>
                  </Layout>
                </Layout>
              </Layout>
    );
  }

  componentDidMount() {

    const { date_range, dispatchFetchStats } = this.props;
    dispatchFetchStats(date_range)

  }
}

export default connect(
  ({Stats}) => ({date_range: Stats.date_range}),
  dispatch => ({ dispatchFetchStats: (payload) => {
    dispatch({type: statsActions.FETCH_STATS, payload })
  } })
)(App);
