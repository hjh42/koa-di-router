const _STACK_ = {};
const _ROUTES_ = {};
const _CONTROLLER_ = {};

function Controller(target) {
  _CONTROLLER_[target.name] = new target();
  return target;
}

function RequestMapping(path, method) {
  return (target, name, descriptor) => {
    if (!method) {
      _STACK_[target.name].map((v) => {
        _ROUTES_[path] = _ROUTES_[path] || {};
        _ROUTES_[path].target = target.name;
        _ROUTES_[path][v[0]] = v[1];
      });
      return target;
    } else {
      let key = path + ':' + method;
      let arr = _STACK_[target.constructor.name] || []; 
      _STACK_[target.constructor.name] = [...arr, [key, name]];
      return target; 
    }
  }
}

class Router{
  route() {
    return async (ctx, next) => {
      const path = ctx.request.url.split('/');
      const controller = '/' + path[1];
      const actionKey = `${'/' + path[2]}:${ctx.method.toLocaleUpperCase()}`;
      try {
        const target = _ROUTES_[controller].target;
        const funName = _ROUTES_[controller][actionKey]; 
        _CONTROLLER_[target][funName](ctx, next);
      } catch (error) {
        ctx.body = 404;
      }
    }
  }
}

export { Controller, RequestMapping, Router };
