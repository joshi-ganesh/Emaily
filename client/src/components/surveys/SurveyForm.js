//SurveyForm shows a form for a user to add inputs
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({label, name}) => {
            return (<Field key={name} component={SurveyField} type='text' label={label} name={name} />);
        });
    }
  
    render() {
    return (
        <div style={{marginTop: '40px'}}>
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} style={{margin: "0 10px"}}>
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">
                    <i className='material-icons right'>cancel</i>   
                    Cancel
                </Link>
                <button type='submit' className='teal btn-flat right white-text'>
                    Next
                    <i className='material-icons right'>arrow_forward</i>    
                </button>
            </form>
        </div>
    )
  }
}

function validate(values) {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');
    
    _.each(formFields, ({name}) => {
        if(!values[name]) {
            errors[name] = `You must provide a value!`;
        }
    });

    if(values.recipients && values.recipients[values.recipients.length - 1] === ",") {
        errors.recipients =  "You must provide at least one email address after comma";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);