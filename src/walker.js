/* simple tree walker for Parser API style AST trees */

function Walker() {
    this.enter = function (node) { };
    this.exit = function (node) { };
}

Walker.prototype.walk = function (node) {
    if (!node) {
        return; // TODO: proper validation
    }
    this.enter(node);
    this[node.type](node);
    this.exit(node);
};


var handlers = {};



Walker.prototype.walkEach = function (nodes) {
    for (var i = 0; i < nodes.length; i++) {
        this.walk(nodes[i]);
    }
};

Walker.prototype.AssignmentExpression = function (node) {
    this.walk(node.left);
    this.walk(node.right);
};

Walker.prototype.ArrayExpression = function (node) {
    this.walkEach(node.elements);
};

Walker.prototype.BlockStatement = function (node) {
    this.walkEach(node.body);
};

Walker.prototype.BinaryExpression = function (node) {
    this.walk(node.left);
    this.walk(node.right);
};

Walker.prototype.BreakStatement = function (node) {
    this.walk(node.label);
};

Walker.prototype.CallExpression = function (node) {
    this.walk(node.callee);
    this.walkEach(node.arguments);
};

Walker.prototype.CatchClause = function (node) {
    this.walk(node.param);
    this.walk(node.guard);
    this.walk(node.body);
};

Walker.prototype.ConditionalExpression = function (node) {
    this.walk(node.test);
    this.walk(node.alternate);
    this.walk(node.consequent);
};

Walker.prototype.ContinueStatement = function (node) {
    this.walk(node.label);
};

Walker.prototype.DoWhileStatement = function (node) {
    this.walk(node.body);
    this.walk(node.test);
};

Walker.prototype.DebuggerStatement = function (node) {

};

Walker.prototype.EmptyStatement = function (node) {

};

Walker.prototype.ExpressionStatement = function (node) {
    this.walk(node.expression);
};

Walker.prototype.ForStatement = function (node) {
    this.walk(node.init);
    this.walk(node.test);
    this.walk(node.update);
    this.walk(node.body);
};

Walker.prototype.ForInStatement = function (node) {
    this.walk(node.left);
    this.walk(node.right);
    this.walk(node.body);
};

Walker.prototype.ForOfStatement = function (node) {
    this.walk(node.left);
    this.walk(node.right);
    this.walk(node.body);
};

Walker.prototype.FunctionDeclaration = function (node) {
    this.walk(node.id);
    this.walkEach(node.params);
    this.walk(node.rest);
    this.walk(node.body);
};

Walker.prototype.FunctionExpression = function (node) {
    this.walk(node.id);
    this.walkEach(node.params);
    this.walk(node.rest);
    this.walk(node.body);
};

Walker.prototype.Identifier = function (node) {

};

Walker.prototype.IfStatement = function (node) {
    this.walk(node.text);
    this.walk(node.consequent);
    this.walk(node.alternate);
};

Walker.prototype.Literal = function (node) {

};

Walker.prototype.LabeledStatement = function (node) {
    this.walk(node.body);
};

Walker.prototype.LogicalExpression = function (node) {
    this.walk(node.left);
    this.walk(node.right);
};

Walker.prototype.MemberExpression = function (node) {
    this.walk(node.object);
    this.walk(node.property);
};

Walker.prototype.NewExpression = function (node) {
    this.walk(node.callee);
    this.walk(node.arguments);
};

Walker.prototype.ObjectExpression = function (node) {
    this.walkEach(node.properties);
};

Walker.prototype.Program = function (node) {
    this.walkEach(node.body);
};

Walker.prototype.Property = function (node) {
    this.walk(node.key);
    this.walk(node.value);
};

Walker.prototype.ReturnStatement = function (node) {
    this.walk(node.argument);
};

Walker.prototype.SequenceExpression = function (node) {
    this.walkEach(node.expressions);
};

Walker.prototype.SwitchStatement = function (node) {
    this.walk(node.discriminant);
    this.walkEach(node.cases);
};

Walker.prototype.SwitchCase = function (node) {
    this.walk(node.test);
    this.walkEach(node.consequent);
};

Walker.prototype.ThisExpression = function (node) {

};

Walker.prototype.ThrowStatement = function (node) {
    this.walk(node.argument);
};

Walker.prototype.TryStatement = function (node) {
    this.walk(node.block);
    this.walk(node.handler);
    this.walkEach(node.guardedHandlers);
    this.walk(node.finalizer);
};

Walker.prototype.UnaryExpression = function (node) {
    this.walk(node.argument);
};

Walker.prototype.UpdateExpression = function (node) {
    this.walk(node.argument);
};

Walker.prototype.VariableDeclaration = function (node) {
    this.walkEach(node.declarations);
};

Walker.prototype.VariableDeclarator = function (node) {
    this.walk(node.id);
    this.walk(node.init);
};

Walker.prototype.WhileStatement = function (node) {
    this.walk(node.test);
    this.walk(node.body);
};

Walker.prototype.WithStatement = function (node) {
    this.walk(node.object);
    this.walk(node.body);
};

// TODO: bring browserify into the workflow
//    module.exports = {
//        walk: walk,
//        setCallback: setCallback
//    };
