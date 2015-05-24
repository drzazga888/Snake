function Obstacles(n) {
    this.items = [];
    while(this.items.length < n)
        this.putOne();
}

Obstacles.prototype.putOne = function() {
    // kładzie jedną przeszkodę
};