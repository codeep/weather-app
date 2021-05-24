import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import actions from '../../actions';
import './style.css';
import { CountrySelect, View } from '../../components';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewList: [],
      enteredView: '',
      dragedRegion: '',
    };
    this.removeView = this.removeView.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.getDataRegion = this.getDataRegion.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
  };

  componentDidMount() {
    document.addEventListener('dragstart', this.handleDragStart);
    document.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    document.removeEventListener('dragstart', this.handleDragStart);
    document.removeEventListener('drop', this.handleDrop);
  }

  getWeather = async ({ region }) => {
    const { viewList } = this.state;
    try {
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
    } catch (e) {
      alert('Please select a region');
    }
  };

  removeView(region){
    const { viewList } = this.state;
    const nextViewList = viewList.filter(item => item.region !== region);
    this.setState({ viewList: nextViewList });
  };

  handleDragStart(e){
    const region = e.target.getAttribute('data-region');
    this.setState({ dragedRegion: region });
  }

  getDataRegion(target){
    let region = target.getAttribute('data-region');
    return region || this.getDataRegion(ReactDOM.findDOMNode(target).parentElement);
  }

  handleDrop({ target }){
    const dropedRegion = this.getDataRegion(target);
    const { viewList, dragedRegion } = this.state;

    const dropedRegionIndex = viewList.findIndex(({ region }) => region === dropedRegion);
    const dragedRegionIndex = viewList.findIndex(({ region }) => region === dragedRegion);

    const nextViewList = [...viewList];
    nextViewList[dropedRegionIndex] = viewList[dragedRegionIndex];
    nextViewList[dragedRegionIndex] = viewList[dropedRegionIndex];
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
                removeView={this.removeView}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Home;