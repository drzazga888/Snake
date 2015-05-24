function HealthyAppleField(ctx, position) {
    AppleField.call(this, ctx, position, 3, "red", "#0c0");
}

HealthyAppleField.prototype = Object.create(AppleField.prototype);
HealthyAppleField.prototype.constructor = HealthyAppleField;