function EmptyField(ctx, position) {
	Field.call(this, ctx, position, 0);
}

EmptyField.prototype = Object.create(Field.prototype);
EmptyField.prototype.constructor = EmptyField;

EmptyField.prototype.draw = function() {
    Field.prototype.draw.call(this);
};