import React from 'react';
const AssignmentCreate = React.lazy(() => import('./views/assignment/AssignmentCreate'));
const AssignmentList = React.lazy(() => import('./views/assignment/AssignmentList'));
const AssignmentEdit = React.lazy(() => import('./views/assignment/AssignmentEdit'));
const ResponderCreate = React.lazy(() => import('./views/responder/ResponderCreate'));
const ResponderList = React.lazy(() => import('./views/responder/ResponderList'));
const ResponderEdit = React.lazy(() => import('./views/responder/ResponderEdit'));
const ResponderGroupCreate = React.lazy(() => import('./views/responder-group/ResponderGroupCreate'));
const ResponderGroupList = React.lazy(() => import('./views/responder-group/ResponderGroupList'));
const ResponderGroupEdit = React.lazy(() => import('./views/responder-group/ResponderGroupEdit'));
const SurveyCreate = React.lazy(() => import('./views/survey/SurveyCreate'));
const SurveyList = React.lazy(() => import('./views/survey/SurveyList'));
const SurveyEdit = React.lazy(() => import('./views/survey/SurveyEdit'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/survey/create', exact: true,  name: 'Survey Create', component: SurveyCreate },
  { path: '/surveys', exact: true,  name: 'Survey List', component: SurveyList },
  { path: '/survey/:id', exact: true, name: 'Survey Details', component: SurveyEdit },
  { path: '/assignment/create', exact: true,  name: 'Assignment Create', component: AssignmentCreate },
  { path: '/assignments', exact: true,  name: 'Assignment List', component: AssignmentList },
  { path: '/assignment/:id', exact: true, name: 'Assignment Details', component: AssignmentEdit },
  { path: '/responder-group/create', exact: true,  name: 'Responder Group Create', component: ResponderGroupCreate },
  { path: '/responder-groups', exact: true,  name: 'Responder Group List', component: ResponderGroupList },
  { path: '/responder-group/:id', exact: true, name: 'Responder Group Details', component: ResponderGroupEdit },
  { path: '/responder/create', exact: true,  name: 'Responder Create', component: ResponderCreate },
  { path: '/responders', exact: true,  name: 'Responder List', component: ResponderList },
  { path: '/responder/:id', exact: true, name: 'Responder Details', component: ResponderEdit },
];

export default routes;
