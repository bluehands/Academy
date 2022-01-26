const ko = require("knockout");

function createViewModel() {
    var vm = {
        searchBarActive: ko.observable(false),
        searchBarInput: ko.observable("")
            .extend({ rateLimit: 500 }),
    };

    vm.searchBarInput.subscribe(search => {
        console.log(`Search: ${search}`)
    });

    return vm;
}

window.addEventListener('DOMContentLoaded', (event) => {
    ko.applyBindings(createViewModel());
});
