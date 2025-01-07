// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name} style={{marginBottom: '10px'}}>
                <label className='black-text' style={{display: 'flex',paddingBottom: '5px'}}>
                    <span className="new badge" data-badge-caption={label} style={{marginLeft: 0}}></span>
                </label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
    <div>
        <h5>Please confirm your entries</h5>
        {reviewFields}
        <div className='actions-container' style={{display: 'flex', gap:'20px', justifyContent: 'space-between',marginTop: '30px'}}>
            <button className='red btn-flat white-text' onClick={onCancel}>
                <i className='material-icons left'>arrow_back</i>
                Back
            </button>
            <button className='teal btn-flat white-text' type='submit' onClick={() => submitSurvey(formValues, history)}>
                <i className='material-icons right'>email</i>
                Send Survey
            </button>
        </div>
    </div>
  )
}

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));