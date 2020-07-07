module.exports = function(option, proName) {
  var template = option.template;
  var router = option.router;
  if (template !== 'react' && template !== 'vue'
  && template !== 'base' && template !== 'preg'
  && template !== 'ts-vue-full'
  && template !== 'ts-react'
  && template !== 'preg-react' && template !== 'micro') {
      console.log('please add a template eg: -t react ;support react base vue');
      return;
  }
  var yeoman = require('yeoman-environment');
  var env = yeoman.createEnv();

  if (router) {
      template = template + '-router';
  }
  //env.register(require.resolve('./generator-myapp/generators/' + template), template);
  //env.run(template, {proName: proName, template: template});
  env.register(require.resolve('./generator-myapp/generators/gen-template'), 'gen-template');
  env.run('gen-template', {proName: proName, template: template});
  
  //env.lookup(function() {
  //  env.run('mtext', {
  //    'skip-install': true
  //  }, function(err) {
  //    if (err) {
  //      throw err;
  //    }
  //  });
  //});
}
