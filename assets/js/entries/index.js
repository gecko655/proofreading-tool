Vue.directive('highlight-range', (el, binding) => {
  const markInstance = new Mark(el);
  const indices = binding.arg.ViolatedIndices;
  indices.forEach((index) => {
    markInstance.markRanges([{ start: index.Start, length: index.Length }]);
  });
});

const vue = new Vue({
  data: {
    ok: false,
    proofreadResults: [],
    errorMsg: '',
    isUploading: false,
    fileName: '',
  },
  methods: {
    onDrop(event) {
      if (
        !event ||
        !event.dataTransfer ||
        event.dataTransfer.files.length === 0
      ) {
        return;
      }
      const file = event.dataTransfer.files[0];
      this.ok = false;
      this.proofreadResults = [];
      this.fileName = '';
      this.errorMsg = '';
      this.isUploading = true;
      window.api.proofread(file.path).then((proofreadResult) => {
        console.log(proofreadResult);
        if (proofreadResult.errorMsg != null) {
          this.errorMsg = proofreadResult.errorMsg;
          this.isUploading = false;
          return;
        }
        this.ok = proofreadResult.ok;
        this.proofreadResults = proofreadResult.results;
        this.fileName = proofreadResult.fileName;
        this.isUploading = false;
      });
    },
    hasFileName() {
      return this.fileName.length > 0;
    },
    openTextlintConfig() {
      window.api.openTextlintConfig();
    },
  },
});
vue.$mount('#vue');
