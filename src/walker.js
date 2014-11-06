/* simple tree walker for Parser API style AST trees */

function Walker() {
    this.shouldWalk = function (node) {
        return true;
    };
    this.enter = function (node) { };
    this.exit = function (node) { };
}

Walker.prototype.walk = function (node, name, parent) {
    if (!node) {
        return; // TODO: proper validation
        // for now we assume that the AST is properly formed
    }
    if (this.shouldWalk(node, name, parent)) {
        this.enter(node, name, parent);
        this[node.type](node);
        this.exit(node, name, parent);
    }
};

Walker.prototype.walkEach = function (nodes, name, parent) {
    for (var i = 0; i < nodes.length; i++) {
        this.walk(nodes[i], name + "[" + i + "]", parent);
    }
};

Walker.prototype.AssignmentExpression = function (node) {
    this.walk(node.left, "left", node);
    this.walk(node.right, "right", node);
};

Walker.prototype.ArrayExpression = function (node) {
    this.walkEach(node.elements, "elements", node);
};

Walker.prototype.BlockStatement = function (node) {
    this.walkEach(node.body, "body", node);
};

Walker.prototype.BinaryExpression = function (node) {
    this.walk(node.left, "left", node);
    this.walk(node.right, "left", node);
};

Walker.prototype.BreakStatement = function (node) {
    this.walk(node.label, "label", node);
};

Walker.prototype.CallExpression = function (node) {
    this.walk(node.callee, "callee", node);
    this.walkEach(node.arguments, "arguments", node);
};

Walker.prototype.CatchClause = function (node) {
    this.walk(node.param, "param", node);
    this.walk(node.guard, "guard", node);
    this.walk(node.body, "body", node);
};

Walker.prototype.ConditionalExpression = function (node) {
    this.walk(node.test, "test", node);
    this.walk(node.alternate, "alternate", node);
    this.walk(node.consequent, "consequent", node);
};

Walker.prototype.ContinueStatement = function (node) {
    this.walk(node.label, "label", node);
};

Walker.prototype.DoWhileStatement = function (node) {
    this.walk(node.body, "body", node);
    this.walk(node.test, "test", node);
};

Walker.prototype.DebuggerStatement = function (node) {

};

Walker.prototype.EmptyStatement = function (node) {

};

Walker.prototype.ExpressionStatement = function (node) {
    this.walk(node.expression, "expression", node);
};

Walker.prototype.ForStatement = function (node) {
    this.walk(node.init, "init", node);
    this.walk(node.test, "init", node);
    this.walk(node.update, "update", node);
    this.walk(node.body, "body", node);
};

Walker.prototype.ForInStatement = function (node) {
    this.walk(node.left, "left", node);
    this.walk(node.right, "right", node);
    this.walk(node.body, "body", node);
};

Walker.prototype.ForOfStatement = function (node) {
    this.walk(node.left, "left", node);
    this.walk(node.right, "right", node);
    this.walk(node.body, "body", node);
};

Walker.prototype.FunctionDeclaration = function (node) {
    this.walk(node.id, "id", node);
    this.walkEach(node.params, "params", node);
    this.walk(node.rest, "rest", node);
    this.walk(node.body, "body", node);
};

Walker.prototype.FunctionExpression = function (node) {
    this.walk(node.id, "id", node);
    this.walkEach(node.params, "params", node);
    this.walk(node.rest, "rest", node);
    this.walk(node.body, "body", node);
};

Walker.prototype.Identifier = function (node) {

};

Walker.prototype.IfStatement = function (node) {
    this.walk(node.text, "test", node);
    this.walk(node.consequent, "consequent", node);
    this.walk(node.alternate, "alternate", node);
};

Walker.prototype.Literal = function (node) {

};

Walker.prototype.LabeledStatement = function (node) {
    this.walk(node.body, "body", node);
};

Walker.prototype.LogicalExpression = function (node) {
    this.walk(node.left, "left", node);
    this.walk(node.right, "right", node);
};

Walker.prototype.MemberExpression = function (node) {
    this.walk(node.object, "object", node);
    this.walk(node.property, "property", node);
};

Walker.prototype.NewExpression = function (node) {
    this.walk(node.callee, "callee", node);
    this.walk(node.arguments, "arguments", node);
};

Walker.prototype.ObjectExpression = function (node) {
    this.walkEach(node.properties, "properties", node);
};

Walker.prototype.Program = function (node) {
    this.walkEach(node.body, "body", node);
};

Walker.prototype.Property = function (node) {
    this.walk(node.key, "key", node);
    this.walk(node.value, "value", node);
};

Walker.prototype.ReturnStatement = function (node) {
    this.walk(node.argument, "argument", node);
};

Walker.prototype.SequenceExpression = function (node) {
    this.walkEach(node.expressions, "expressions", node);
};

Walker.prototype.SwitchStatement = function (node) {
    this.walk(node.discriminant, "discriminant", node);
    this.walkEach(node.cases, "cases", node);
};

Walker.prototype.SwitchCase = function (node) {
    this.walk(node.test, "test", node);
    this.walkEach(node.consequent, "consequent", node);
};

Walker.prototype.ThisExpression = function (node) {

};

Walker.prototype.ThrowStatement = function (node) {
    this.walk(node.argument, "argument", node);
};

Walker.prototype.TryStatement = function (node) {
    this.walk(node.block, "block", node);
    this.walk(node.handler, "handler", node);
    this.walkEach(node.guardedHandlers, "guardedHandlers", node);
    this.walk(node.finalizer, "finalizer", node);
};

Walker.prototype.UnaryExpression = function (node) {
    this.walk(node.argument, "argument", node);
};

Walker.prototype.UpdateExpression = function (node) {
    this.walk(node.argument, "argument", node);
};

Walker.prototype.VariableDeclaration = function (node) {
    this.walkEach(node.declarations, "declarations", node);
};

Walker.prototype.VariableDeclarator = function (node) {
    this.walk(node.id, "id", node);
    this.walk(node.init, "init", node);
};

Walker.prototype.WhileStatement = function (node) {
    this.walk(node.test, "test", node);
    this.walk(node.body, "body", node);
};

Walker.prototype.WithStatement = function (node) {
    this.walk(node.object, "object", node);
    this.walk(node.body, "body", node);
};

// TODO: bring browserify into the workflow
//    module.exports = {
//        walk: walk,
//        setCallback: setCallback
//    };
