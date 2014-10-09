var enter = function(node) {

};

var leave = function(node) {

};

function setCallback(_enter, _leave) {
    enter = _enter || enter;
    leave = _leave || leave;
}

var handlers = {};

var walk = function(node) {
    if (!node) {
        return; // TODO: proper validation
    }
    enter(node);
    handlers[node.type](node);
    leave(node);
};

var walkEach = function (nodes) {
    for (var i = 0; i < nodes.length; i++) {
        walk(nodes[i]);
    }
};

handlers.AssignmentExpression = function (node) {
    walk(node.left);
    walk(node.right);
};

handlers.ArrayExpression = function (node) {
    walkEach(node.elements);
};

handlers.BlockStatement = function (node) {
    walkEach(node.body);
};

handlers.BinaryExpression = function (node) {
    walk(node.left);
    walk(node.right);
};

handlers.BreakStatement = function (node) {
    walk(node.label);
};

handlers.CallExpression = function (node) {
    walk(node.callee);
    walkEach(node.arguments);
};

handlers.CatchClause = function (node) {
    walk(node.param);
    walk(node.guard);
    walk(node.body);
};

handlers.ConditionalExpression = function (node) {
    walk(node.test);
    walk(node.alternate);
    walk(node.consequent);
};

handlers.ContinueStatement = function (node) {
    walk(node.label);
};

handlers.DoWhileStatement = function (node) {
    walk(node.body);
    walk(node.test);
};

handlers.DebuggerStatement = function (node) {

};

handlers.EmptyStatement = function (node) {

};

handlers.ExpressionStatement = function (node) {
    walk(node.expression);
};

handlers.ForStatement = function (node) {
    walk(node.init);
    walk(node.test);
    walk(node.update);
    walk(node.body);
};

handlers.ForInStatement = function (node) {
    walk(node.left);
    walk(node.right);
    walk(node.body);
};

handlers.ForOfStatement = function (node) {
    walk(node.left);
    walk(node.right);
    walk(node.body);
};

handlers.FunctionDeclaration = function (node) {
    walk(node.id);
    walkEach(node.params);
    walk(node.rest);
    walk(node.body);
};

handlers.FunctionExpression = function (node) {
    walk(node.id);
    walkEach(node.params);
    walk(node.rest);
    walk(node.body);
};

handlers.Identifier = function (node) {

};

handlers.IfStatement = function (node) {
    walk(node.text);
    walk(node.consequent);
    walk(node.alternate);
};

handlers.Literal = function (node) {

};

handlers.LabeledStatement = function (node) {
    walk(node.body);
};

handlers.LogicalExpression = function (node) {
    walk(node.left);
    walk(node.right);
};

handlers.MemberExpression = function (node) {
    walk(node.object);
    walk(node.property);
};

handlers.NewExpression = function (node) {
    walk(node.callee);
    walk(node.arguments);
};

handlers.ObjectExpression = function (node) {
    walkEach(node.properties);
};

handlers.Program = function (node) {
    walkEach(node.body);
};

handlers.Property = function (node) {
    walk(node.key);
    walk(node.value);
};

handlers.ReturnStatement = function (node) {
    walk(node.argument);
};

handlers.SequenceExpression = function (node) {
    walkEach(node.expressions);
};

handlers.SwitchStatement = function (node) {
    walk(node.discriminant);
    walkEach(node.cases);
};

handlers.SwitchCase = function (node) {
    walk(node.test);
    walkEach(node.consequent);
};

handlers.ThisExpression = function (node) {

};

handlers.ThrowStatement = function (node) {
    walk(node.argument);
};

handlers.TryStatement = function (node) {
    walk(node.block);
    walk(node.handler);
    walkEach(node.guardedHandlers);
    walk(node.finalizer);
};

handlers.UnaryExpression = function (node) {
    walk(node.argument);
};

handlers.UpdateExpression = function (node) {
    walk(node.argument);
};

handlers.VariableDeclaration = function (node) {
    walkEach(node.declarations);
};

handlers.VariableDeclarator = function (node) {
    walk(node.id);
    walk(node.init);
};

handlers.WhileStatement = function (node) {
    walk(node.test);
    walk(node.body);
};

handlers.WithStatement = function (node) {
    walk(node.object);
    walk(node.body);
};

// TODO: bring browserify into the workflow
//    module.exports = {
//        walk: walk,
//        setCallback: setCallback
//    };
