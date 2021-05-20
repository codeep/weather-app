import React, { Component } from 'react';
import actions from '../../actions';
import './style.css';
import {
  CountrySelect,
  View,
} from '../../components';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewList: [],
    };
  };

  getWeather = async ({ region }) => {
    const { viewList } = this.state;
    try{
      const data = await actions.fetchWeather(region);
      
      const fetchedRegions = viewList.map(item => item.region);
      
      if (!fetchedRegions.includes(region)) {
        this.setState(prevState => ({
          viewList: [...prevState.viewList, data],
        }));
      } else {
        this.setState(({ viewList }) => ({
          viewList: viewList.map(item => item.region === region ? data : item),
        }));
      }
    }catch(e){
      console.log(e);
      alert('Please select a region');
    }
  };

  removeView = (region) => {
    const { viewList } = this.state;
    const nextViewList = viewList.filter(item => item.region !== region);
    this.setState({ viewList: nextViewList });
  }

  render() {
    const { viewList } = this.state;

    return (
      <div className='home'>
        <CountrySelect getWeather={this.getWeather} />
        <div className='view_screen'>
          {
            viewList.map(data => (
              <View
                key={data.region}
                data={data}
                removeView={() => this.removeView(data.region)}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Home;