import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';


class App extends Component {

  state = {
    src: 'https://www.youtube.com/watch?v=TBIOSL9sdR0'
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnProgress = this.handleOnProgress.bind(this);
    this.onSeekChange = this.onSeekChange.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
  }

  handleChange(event) {
    this.setState({
      src: event.target.value
    })
  }

  handleOnProgress({ played }) {
    this.setState({ played });
  }

  onSeekMouseDown = e => {
      this.setState({ seeking: true })
    }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.refs.player.seekTo(parseFloat(e.target.value))
  }

  render() {
    const youtubeUrl = 'https://www.youtube.com/watch?v=TBIOSL9sdR0';
    const soundCloudUrl = 'https://soundcloud.com/aj-spaff/mendelssohn-venetian-boat-song';
    const awsUrl = 'https://s3-us-west-2.amazonaws.com/maestro-clips/56d9ee0889fb6e7d47199590/5750dd5b2c5dd60edeb0ef65.mp3';

    return (
      <div>
        <select onChange={ this.handleChange } value={ this.state.src }>
          <option value={youtubeUrl}>YouTube</option>
          <option value={soundCloudUrl}>Soundcloud</option>
          <option value={awsUrl}>AWS</option>
        </select>
        <br />
        <progress max={1} value={this.state.played} />
        <br />
        <input
          type='range' min={0} max={1} step='any'
          value={this.state.played}
          onMouseDown={this.onSeekMouseDown}
          onChange={this.onSeekChange}
          onMouseUp={this.onSeekMouseUp}
        />
        <ReactPlayer
          ref='player'
          url={this.state.src}
          playing={true}
          width={0}
          height={0}
          loop={true}
          onProgress={this.handleOnProgress}
        />
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.querySelector('.container')
);
