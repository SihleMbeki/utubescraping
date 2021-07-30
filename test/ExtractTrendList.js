const trends = require('./pageobjects/Trending.page');

describe('Extract Trend List', () => {
    it('Navigate to trends', () => {
        trends.navigateToTrends();
    });

    it('Extract data', () => {
        trends.extractTrends();
    });
});


