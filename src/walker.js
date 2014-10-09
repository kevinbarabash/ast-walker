/**
 * Created by kevin on 2014-10-08.
 */

var handlers = {};
var callbacks = {};


callbacks.VariableDeclarator = function (node) {
    console.log("var: " + node.id.name);
};

callbacks.FunctionExpression = function (node) {
    node.params.forEach(function (param) {
        console.log("param: " + param.name);
    });
};

callbacks.FunctionDeclaration = function (node) {
    node.params.forEach(function (param) {
        console.log("param: " + param.name);
    });
};

callbacks.AssignmentExpression = function (node) {
    if (node.left.type === "Identifier") {
        console.log("assign: " + node.left.name);
    }
};


function callCallback(node) {
    if (callbacks[node.type]) {
        callbacks[node.type](node);
    }
}

function callHandler(node) {
    handlers[node.type](node);
}


handlers.AssignmentExpression = function (node) {
    if (node.type !== "AssignmentExpression") {
        throw "not a 'AssignmentExpression'";
    }
    callCallback(node);
    callHandler(node.left);
    callHandler(node.right);
};

handlers.ArrayExpression = function (node) {
    if (node.type !== "ArrayExpression") {
        throw "not a 'ArrayExpression'";
    }
    callCallback(node);
    node.elements.forEach(function (element) {
        if (element !== null) {
            callHandler(element);
        }
    });
};

handlers.BlockStatement = function (node) {
    if (node.type !== "BlockStatement") {
        throw "not a 'BlockStatement'";
    }
    callCallback(node);
    node.body.forEach(function (child) {
        callHandler(child);
    });
};

handlers.BinaryExpression = function (node) {
    if (node.type !== "BinaryExpression") {
        throw "not a 'BinaryExpression'";
    }
    callCallback(node);
    callHandler(node.left);
    callHandler(node.right);
};

handlers.BreakStatement = function (node) {
    if (node.type !== "BreakStatement") {
        throw "not a 'BreakStatement'";
    }
    callCallback(node);
    callHandler(node.label);
};

handlers.CallExpression = function (node) {
    if (node.type !== "CallExpression") {
        throw "not a 'CallExpression'";
    }
    callCallback(node);
    callHandler(node.callee);
    node.arguments.forEach(function (argument) {
        callHandler(argument);
    });
};

handlers.CatchClause = function (node) {
    if (node.type !== "CatchClause") {
        throw "not a 'CatchClause'";
    }
    callCallback(node);
    callHandler(node.param);
    if (node.guard !== null) {
        callHandler(node.guard);
    }
    callHandler(node.body);
};

handlers.ConditionalExpression = function (node) {
    if (node.type !== "ConditionalExpression") {
        throw "not a 'ConditionalExpression'";
    }
    callCallback(node);
    callHandler(node.test);
    callHandler(node.alternate);
    callHandler(node.consequent);
};

handlers.ContinueStatement = function (node) {
    if (node.type !== "ContinueStatement") {
        throw "not a 'ContinueStatement'";
    }
    callCallback(node);
    callHandler(node.label);
};

handlers.DoWhileStatement = function (node) {
    if (node.type !== "DoWhileStatement") {
        throw "not a 'DoWhileStatement'";
    }
    callCallback(node);
    callHandler(node.body);
    callHandler(node.test);
};

handlers.DebuggerStatement = function (node) {
    if (node.type !== "DebuggerStatement") {
        throw "not a 'DebuggerStatement'";
    }
    callCallback(node);
};

handlers.EmptyStatement = function (node) {
    if (node.type !== "EmptyStatement") {
        throw "not a 'EmptyStatement'";
    }
    callCallback(node);
};

handlers.ExpressionStatement = function (node) {
    if (node.type !== "ExpressionStatement") {
        throw "not a 'ExpressionStatement'";
    }
    callCallback(node);
    callHandler(node.expression);
};

handlers.ForStatement = function (node) {
    if (node.type !== "ForStatement") {
        throw "not a 'ForStatement'";
    }
    callCallback(node);
    if (node.init !== null) {
        callHandler(node.init);
    }
    if (node.test !== null) {
        callHandler(node.test);
    }
    if (node.update !== null) {
        callHandler(node.update);
    }
    callHandler(node.body);
};

handlers.ForInStatement = function (node) {
    if (node.type !== "ForInStatement") {
        throw "not a 'ForInStatement'";
    }
    callCallback(node);
    callHandler(node.left);
    callHandler(node.right);
    callHandler(node.body);
};

handlers.ForOfStatement = function (node) {
    if (node.type !== "ForOfStatement") {
        throw "not a 'ForOfStatement'";
    }
    callCallback(node);
    callHandler(node.left);
    callHandler(node.right);
    callHandler(node.body);
};

handlers.FunctionDeclaration = function (node) {
    if (node.type !== "FunctionDeclaration") {
        throw "not a 'FunctionDeclaration'";
    }
    callCallback(node);
    callHandler(node.id);
    node.params.forEach(function (param) {
        callHandler(param);
    });
    if (node.rest !== null) {
        callHandler(node.rest);
    }
    callHandler(node.body);
};

handlers.FunctionExpression = function (node) {
    if (node.type !== "FunctionExpression") {
        throw "not a 'FunctionExpression'";
    }
    callCallback(node);
    if (node.id !== null) {
        callHandler(node.id);
    }
    node.params.forEach(function (param) {
        callHandler(param);
    });
    if (node.rest !== null) {
        callHandler(node.rest);
    }
    callHandler(node.body);
};

handlers.Identifier = function (node) {
    if (node.type !== "Identifier") {
        throw "not a 'Identifier'";
    }
    callCallback(node);
};

handlers.IfStatement = function (node) {
    if (node.type !== "IfStatement") {
        throw "not a 'IfStatement'";
    }
    callCallback(node);
    callHandler(node.text);
    callHandler(node.consequent);
    if (node.alternate !== null) {
        callHandler(node.alternate);
    }
};

handlers.Literal = function (node) {
    if (node.type !== "Literal") {
        throw "not a 'Literal'";
    }
    callCallback(node);
};

handlers.LabeledStatement = function (node) {
    if (node.type !== "LabeledStatement") {
        throw "not a 'LabeledStatement'";
    }
    callCallback(node);
    callHandler(node.body);
};

handlers.LogicalExpression = function (node) {
    if (node.type !== "LogicalExpression") {
        throw "not a 'LogicalExpression'";
    }
    callCallback(node);
    callHandler(node.left);
    callHandler(node.right);
};

handlers.MemberExpression = function (node) {
    if (node.type !== "MemberExpression") {
        throw "not a 'MemberExpression'";
    }
    callCallback(node);
    callHandler(node.object);
    callHandler(node.property);
};

handlers.NewExpression = function (node) {
    if (node.type !== "NewExpression") {
        throw "not a 'NewExpression'";
    }
    callCallback(node);
    callHandler(node.callee);
    callHandler(node.arguments);
};

handlers.ObjectExpression = function (node) {
    if (node.type !== "ObjectExpression") {
        throw "not a 'ObjectExpression'";
    }
    callCallback(node);
    node.properties.forEach(function (property) {
        callHandler(property);
    });
};

handlers.Program = function (node) {
    if (node.type !== "Program") {
        throw "not a 'Program'";
    }
    callCallback(node);
    node.body.forEach(function (statement) {
        callHandler(statement);
    });
};

handlers.Property = function (node) {
    if (node.type !== "Property") {
        throw "not a 'Property'";
    }
    callCallback(node);
    callHandler(node.key);
    callHandler(node.value);
};

handlers.ReturnStatement = function (node) {
    if (node.type !== "ReturnStatement") {
        throw "not a 'ReturnStatement'";
    }
    callCallback(node);
    callHandler(node.argument);
};

handlers.SequenceExpression = function (node) {
    if (node.type !== "SequenceExpression") {
        throw "not a 'SequenceExpression'";
    }
    callCallback(node);
    node.expressions.forEach(function (expression) {
        callHandler(expression);
    });
};

handlers.SwitchStatement = function (node) {
    if (node.type !== "SwitchStatement") {
        throw "not a 'SwitchStatement'";
    }
    callCallback(node);
    callHandler(node.discriminant);
    node.cases.forEach(function (_case) {
        callHandler(_case);
    });
};

handlers.SwitchCase = function (node) {
    if (node.type !== "SwitchCase") {
        throw "not a 'SwitchCase'";
    }
    callCallback(node);
    if (node.test !== null) {
        callHandler(node.test);
    }
    node.consequent.forEach(function (statement) {
        callHandler(statement);
    });
};

handlers.ThisExpression = function (node) {
    if (node.type !== "ThisExpression") {
        throw "not a 'ThisExpression'";
    }
    callCallback(node);
};

handlers.ThrowStatement = function (node) {
    if (node.type !== "ThrowStatement") {
        throw "not a 'ThrowStatement'";
    }
    callCallback(node);
    callHandler(node.argument);
};

handlers.TryStatement = function (node) {
    if (node.type !== "TryStatement") {
        throw "not a 'TryStatement'";
    }
    callCallback(node);
    callHandler(node.block);
    if (node.handler !== null) {
        callHandler(node.handler);
    }
    node.guardedHandlers.forEach(function (catchClause) {
        callHandler(catchClause);
    });
    if (node.finalizer !== null) {
        callHandler(node.finalizer);
    }
};

handlers.UnaryExpression = function (node) {
    if (node.type !== "UnaryExpression") {
        throw "not a 'UnaryExpression'";
    }
    callCallback(node);
    callHandler(node.argument);
};

handlers.UpdateExpression = function (node) {
    if (node.type !== "UpdateExpression") {
        throw "not a 'UpdateExpression'";
    }
    callCallback(node);
    callHandler(node.argument);
};

handlers.VariableDeclaration = function (node) {
    if (node.type !== "VariableDeclaration") {
        throw "not a 'VariableDeclaration'";
    }
    callCallback(node);
    node.declarations.forEach(function (declarator) {
        callHandler(declarator);
    });
};

handlers.VariableDeclarator = function (node) {
    if (node.type !== "VariableDeclarator") {
        throw "not a 'VariableDeclarator'";
    }
    callCallback(node);
    callHandler(node.id);
    if (node.init !== null) {
        callHandler(node.init);
    }
};

handlers.WhileStatement = function (node) {
    if (node.type !== "WhileStatement") {
        throw "not a 'WhileStatement'";
    }
    callCallback(node);
    callHandler(node.test);
    callHandler(node.body);
};

handlers.WithStatement = function (node) {
    if (node.type !== "WithStatement") {
        throw "not a 'WithStatement'";
    }
    callCallback(node);
    callHandler(node.object);
    callHandler(node.body);
};
