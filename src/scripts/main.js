const ko = require("knockout");
const elasticlunr = require("elasticlunr");

function createViewModel() {
    var vm = {
        searchIndex: new elasticlunr.Index(),
        searchBarActive: ko.observable(false)
            .extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } }),
        searchBarInput: ko.observable("")
            .extend({ rateLimit: 250 }),
        searchResults: ko.observable([]),
    };

    vm.searchBarInput.subscribe(search => {
        console.log(`Search: ${search}`)
        const results = vm.searchIndex.search(search, {
            bool: "OR",
            expand: true
        }).map((r) => vm.searchIndex.documentStore.getDoc(r.ref));
        console.log(results);
        vm.searchResults(results);
    });

    return vm;
}

window.addEventListener('DOMContentLoaded', (event) => {
    var vm = createViewModel();

    fetch("/search-index.json").then((response) => {
        response.json().then((rawIndex) => {
            vm.searchIndex = elasticlunr.Index.load(rawIndex);
        });
    })

    ko.applyBindings(vm);
});
