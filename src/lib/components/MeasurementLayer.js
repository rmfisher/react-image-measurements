import React, { PureComponent } from 'react';
import MeasurementLayerBase from './core/MeasurementLayerBase';
import MeasurementButtons from './buttons/MeasurementButtons';
import { detectMouse } from '../logic/DetectMouse.js';
import './MeasurementLayer.css';

class MeasurementLayer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { mode: null, mouseDetected: false };
  }

  componentDidMount() {
    detectMouse(() => this.setState({ ...this.state, mouseDetected: true }));
  }

  render() {
    const hasSize = this.props.width > 0 && this.props.height > 0;
    const className = 'measurement-layer' + (this.state.mouseDetected ? ' mouse-detected' : '');
    return (
      hasSize && <div className={className} ref={e => this.root = e}>
        <MeasurementLayerBase
          measurements={this.props.measurements}
          onChange={this.props.onChange}
          width={this.props.width}
          height={this.props.height}
          measureLine={this.props.measureLine}
          measureCircle={this.props.measureCircle}
          formatDistance={this.props.formatDistance}
          formatArea={this.props.formatArea}
          mode={this.state.mode}
          onCommit={this.onCommit}
        />
        <MeasurementButtons mode={this.state.mode} onClick={this.toggleMode} />
      </div>
    );
  }

  toggleMode = mode => this.setState({ mode: mode === this.state.mode ? null : mode });

  onCommit = measurement => {
    this.setState({ mode: null });
    if (this.props.onCommit) {
      this.props.onCommit(measurement);
    }
  }
}

export default MeasurementLayer;