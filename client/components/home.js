import React from 'react';
import {connect} from 'react-redux';
import Plant from './Plant';
import {fetchPlants} from '../store/plants';

class Home extends React.Component {

  componentDidMount() {
    this.props.getPlants();
  }

  render() {
    const {plants} = this.props;
    return (
      <div className="plants-container">
        {/* <h3>Welcome, {username}</h3> */}
        {plants.map (plant => (
          <Plant imageURL={plant.imageURL} name={plant.name}/>
        ))}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  plants: state.plants,
})

const mapDispatchToProps = dispatch => ({
  getPlants: () => dispatch(fetchPlants())
})

export default connect (mapStateToProps, mapDispatchToProps) (Home);
