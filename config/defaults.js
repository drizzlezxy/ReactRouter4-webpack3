var path = require('path');
var chunks = [];
var filePath = {
    srcPath: path.join(__dirname, '../src'),
    tplPath: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist'),
    devbuild: path.join(__dirname, '../devbuild'),
    publicPath: '/'
};

var pages = [
{
    name: 'ShopBillReport/index',
    entry: 'ShopBillReport/index.jsx',
    ftl: 'jipei-statementsPages/ShopBillReport/index.html'
},

{
    name: 'RiderTrade/index',
    entry: 'RiderTrade/index.jsx',
    ftl: 'jipei-statementsPages/RiderTrade/index.html'
},
{
    name: 'ShopTrade/index',
    entry: 'ShopTrade/index.jsx',
    ftl: 'jipei-statementsPages/ShopTrade/index.html'
},
{
    name: 'ShopList/index',
    entry: 'ShopList/index.jsx',
    ftl: 'jipei-statementsPages/ShopList/index.html'
},

{
    name: 'OrderList/index',
    entry: 'OrderList/index.jsx',
    ftl: 'jipei-statementsPages/OrderList/index.html'
},

{
    name: 'RiderList/index',
    entry: 'RiderList/index.jsx',
    ftl: 'jipei-statementsPages/RiderList/index.html'
},
{
        name: 'Login/index',
        entry: 'Login/index.jsx',
        ftl: 'jipei-statementsPages/Login/index.html'
    },

    {
        name: 'Supplies/index',
        entry: 'Supplies/index.jsx',
        ftl: 'jipei-statementsPages/Supplies/index.html'
    },

    {
        name: 'SupplyExpend/index',
        entry: 'SupplyExpend/index.jsx',
        ftl: 'jipei-statementsPages/SupplyExpend/index.html'
    },

    {
        name: 'SupplyBuy/index',
        entry: 'SupplyBuy/index.jsx',
        ftl: 'jipei-statementsPages/SupplyBuy/index.html'
    },

    {
        name: 'Income/index',
        entry: 'Income/index.jsx',
        ftl: 'jipei-statementsPages/Income/index.html'
    },


    {
        name: 'Statements/index',
        entry: 'Statements/index.jsx',
        ftl: 'jipei-statementsPages/Statements/index.html'
    },

    // {
    //     name: 'Test/index',
    //     entry: 'Test/index.jsx',
    //     ftl: 'jipei-statementsPages/Test/index.html'
    // }
];

var pagesToPath = function() {
    var _p = [];
    pages.forEach(function(_page) {
        var _obj = {
            name: _page.name,
            entry: 'page/' + _page.entry,
            ftl: _page.ftl,
            templates: path.join(filePath.tplPath, _page.ftl)
        };
        _p.push(_obj);
        chunks.push(_page.name);
    });
    return _p;
};

module.exports = {
    filePath: filePath,
    port: 8090,
    chunks: chunks
};