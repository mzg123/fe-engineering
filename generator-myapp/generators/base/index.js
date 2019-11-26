var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("name");
  }

  initializing() {
    this.log('initing...');
  }

  installingLodash() {
    //this.npmInstall(['lodash'], { 'save-dev': true });
    // this.npmInstall();
  }


  writing() {
      const proName = this.options['proName'] || 'app';
      this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(proName)
    );
  }
};
