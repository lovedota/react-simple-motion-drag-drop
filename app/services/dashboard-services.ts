import randomColor from 'randomcolor';

class DashboardService {
  async getProducts(): Promise<Product[]> {
    let products: Product[] = [];

    for (let i = 0; i < 24; i++) {
      products.push({
      	id: i.toString(),
        name: `${i + 1}`,
        price: Math.floor(Math.random() * (1000 - 10)) + 10,
        color: randomColor()
      });
    }

    return new Promise<Product[]>((resolve, reject) => {
        resolve(products);
    });
  }
}

export default new DashboardService();
