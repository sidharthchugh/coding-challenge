import React from 'react';
import './questionnaire.css';
import {validate} from './validate'
import * as actions from '../actions';
import {connect} from 'react-redux';

export class Questionnaire extends React.Component {
    constructor() {
      super();
      this.state = {
        email: '',
        age: '',
        beerConsumption: '',
        parties:'',
        touched: {
          email: false,
          age: false,
          parties: false,
          beerConsumption: false,
        },
      };
    }
    
    handleEmailChange = (evt) => {
      this.setState({ email: evt.target.value });
    }
    
    handleAgeChange = (evt) => {
      this.setState({ age: evt.target.value });
    }
    
    handlePartiesChange = (evt) => {
      this.setState({ parties: evt.target.value });
    }
    

    handleBeerConsumptionChange = (evt) => {
      this.setState({ beerConsumption: evt.target.value });
    }
    
    handleBlur = (field) => (evt) => {
      this.setState({
        touched: { ...this.state.touched, [field]: true },
      });
    }
    
    handleSubmit = (evt) => {
      if (!this.canBeSubmitted()) {
        evt.preventDefault();
        return;
      }
      const { email, age, parties, beerConsumption } = this.state;
      let questionsnaire = {
        email, age, parties, beerConsumption
      }
      this.props.dispatch(actions.submitQuestionsnnaire(questionsnaire));
    }
    
    canBeSubmitted() {
      const errors = validate(this.state.email, this.state.age, this.state.beerConsumption);
      const isDisabled = Object.keys(errors).some(x => errors[x]);
      return !isDisabled;
    }
    
    render() {
      const errors = validate(this.state.email, this.state.age, this.state.beerConsumption);
      const isDisabled = Object.keys(errors).some(x => errors[x]);
      
      const shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touched[field];
        
        return hasError ? shouldShow : false;
      };
      
      return (
        <div>
        <h4 className="error-code">{this.props.errorsBackend}</h4>
        {this.props.questionnaire && 
          <form>
          <h2>What's your Email Address? *</h2>
          <input
            className={shouldMarkError('email') ? "error" : ""}
            type="text"
            value={this.state.email}
            onChange={this.handleEmailChange}
            onBlur={this.handleBlur('email')}
          />
          <h2>What's your Age? *</h2>
          <input
            className={shouldMarkError('age') ? "error" : ""}
            type="number"
            value={this.state.age}
            onChange={this.handleAgeChange}
            onBlur={this.handleBlur('age')}
          />
          <h2>How often do you go to parties in a week?</h2>
          <input
            type="text"
            value={this.state.parties}
            onChange={this.handlePartiesChange}
            onBlur={this.handleBlur('parties')}
          />
          <h2>How many beers do you drink a week?  *</h2>
          <input
            className={shouldMarkError('beerConsumption') ? "error" : ""}
            type="number"
            value={this.state.beerConsumption}
            onChange={this.handleBeerConsumptionChange}
            onBlur={this.handleBlur('beerConsumption')}
          />
          <button type="button" onClick={this.handleSubmit} disabled={isDisabled}>Submit</button>

          <p>* Required</p>
        </form>
        }
        {!this.props.questionnaire && <h2>Survey Submitted Successfully</h2>}
        </div>
      )
    }
  }
  

  const mapStateToProps = (state, props) => ({
    questionnaire: state.questionnaire,
    errorsBackend: state.errorsBackend
});

export default connect(mapStateToProps)(Questionnaire);