const MenuItemData = [
    { name: 'Dashboard', to: '/', icon: 'fa fa-tachometer', subMenuItems: [] },
    { name: 'My Profile', to: '/me', icon: 'fa fa-tachometer', subMenuItems: [] },
    { name: 'Create a quiz', to: '/createQuiz', icon: 'fa fa-ticket', subMenuItems: [] },
    { name: 'Coding', to: '/code', icon: 'fa fa-ticket', subMenuItems: [] },
    { name: 'Coding Questions', to: '/codeQuestions', icon: 'fa fa-ticket', subMenuItems: [] },
    { name: 'Create a code question', to: '/createCodeQuestion', icon: 'fa fa-ticket', subMenuItems: [] },
    { name: 'See all quizzes', to: '/quizzes', icon: 'fa fa-ticket', subMenuItems: [] },
    { name: 'Start a quiz', to: '/quiz', icon: 'fa fa-ticket', subMenuItems: [] },
    {
        name: 'College Departments', to: '/rizviDept', icon: 'fa fa-pie-chart',
        subMenuItems: [
            { name: 'Computers', to: '/comps', icon: 'fa fa-pie-chart' },
            { name: 'Electronics', to: '/extc', icon: 'fa fa-pie-chart' },
            { name: 'Mechanical', to: '/mech', icon: 'fa fa-pie-chart' }
        ]
    }
];

export default MenuItemData;
