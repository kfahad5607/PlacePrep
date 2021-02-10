const MenuItemData = [
    { name: 'Dashboard', to: '/', icon: 'fa fa-tachometer', subMenuItems: [] },
    { name: 'Tickets', to: '/tickets', icon: 'fa fa-ticket', subMenuItems: [] },
    {
        name: 'Destinations', to: '/destinations', icon: 'fa fa-pie-chart',
        subMenuItems: [
            { name: 'Canada', to: '/canada', icon: 'fa fa-pie-chart' },
            { name: 'Australia', to: '/australia', icon: 'fa fa-pie-chart' },
            { name: 'India', to: '/india', icon: 'fa fa-pie-chart' }
        ]
    },
    { name: 'Ideas', to: '/ideas', icon: 'fa fa-lightbulb-o', subMenuItems: [] },
    { name: 'Home', to: '/home', icon: 'fa fa-lightbulb-o', subMenuItems: [] },
    { name: 'About', to: '/about', icon: 'fa fa-lightbulb-o', subMenuItems: [] },
    { name: 'Customers', to: '/customer', icon: 'fa fa-lightbulb-o', subMenuItems: [] },
    { name: 'Projects', to: '/project', icon: 'fa fa-lightbulb-o', subMenuItems: [] },
    { name: 'Services', to: '/services', icon: 'fa fa-lightbulb-o', subMenuItems: [] },
    { name: 'Subscriptions', to: '/subscriptions', icon: 'fa fa-cc-stripe', subMenuItems: [] },
    { name: 'Contacts', to: '/contacts', icon: 'fa fa-users', subMenuItems: [] },
    {
        name: 'Overview', to: '/overview', icon: 'fa fa-pie-chart',
        subMenuItems: [
            { name: 'Faculty', to: '/faculty', icon: 'fa fa-pie-chart' },
            { name: 'Students', to: '/students', icon: 'fa fa-pie-chart' },
            { name: 'Parents', to: '/parents', icon: 'fa fa-pie-chart' },
            { name: 'Subjects', to: '/subjects', icon: 'fa fa-pie-chart' }
        ]
    }
];

export default MenuItemData;
