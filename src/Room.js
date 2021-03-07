class Room {
  constructor(data) {
    this.number = data.number;
    this.roomType = data.roomType;
    this.bidet = data.bidet;
    this.bedSize = data.bedSize;
    this.numBeds = data.numBeds;
    this.costPerNight = this.formatCost(data.costPerNight);
  }

  formatCost(cost) {
    // NB returns a string
    return cost.toFixed(2);
  }
};

export default Room;