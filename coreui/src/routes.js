import React from 'react';
const SurveyCreate = React.lazy(() => import('./views/survey/SurveyCreate'));
const SurveyList = React.lazy(() => import('./views/survey/SurveyList'));
const SurveyEdit = React.lazy(() => import('./views/survey/SurveyEdit'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/survey/create', exact: true,  name: 'Survey Create', component: SurveyCreate },
  { path: '/surveys', exact: true,  name: 'Survey List', component: SurveyList },
  { path: '/survey/:id', exact: true, name: 'Survey Details', component: SurveyEdit },

];

export default routes;
