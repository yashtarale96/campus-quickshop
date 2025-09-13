import { useState, useEffect } from 'react';
import { Plus, Package, DollarSign, Users, Eye, CreditCard as Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { products, mockOrders } from '@/data/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VendorDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [vendorProducts, setVendorProducts] = useState(
    products.filter((p) => p.vendorId === user?.vendorId)
  );
  const [vendorOrders, setVendorOrders] = useState(
    mockOrders.filter((order) =>
    order.items.some((item) =>
    products.find((p) => p.id === item.id)?.vendorId === user?.vendorId
    )
    )
  );
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });

  const stats = {
    totalProducts: vendorProducts.length,
    totalOrders: vendorOrders.length,
    totalRevenue: vendorOrders.reduce((sum, order) => sum + order.total, 0),
    lowStockProducts: vendorProducts.filter((p) => p.stock < 10).length
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      image: newProduct.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      vendorId: user?.vendorId || '',
      vendorName: user?.name || '',
      rating: 4.0,
      reviews: 0
    };

    setVendorProducts((prev) => [...prev, product]);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: ''
    });
    setIsAddProductOpen(false);

    toast({
      title: 'Product added',
      description: 'Your product has been added successfully'
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setVendorProducts((prev) => prev.filter((p) => p.id !== productId));
    toast({
      title: 'Product deleted',
      description: 'Product has been removed from your inventory'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Vendor Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Manage your products and orders.
            </p>
          </div>
          
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                    required />

                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                    required />

                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                      required />

                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: e.target.value }))}
                      required />

                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct((prev) => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Stationery">Stationery</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Footwear">Footwear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="image">Image URL (optional)</Label>
                  <Input
                    id="image"
                    type="url"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg" />

                </div>
                
                <Button type="submit" className="w-full">Add Product</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold">{stats.lowStockProducts}</p>
                </div>
                <Package className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Your Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendorProducts.map((product) =>
                  <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                      <div className="aspect-square overflow-hidden rounded-t-lg">
                        <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                          <Badge
                          variant={product.stock < 10 ? "destructive" : "default"}
                          className="text-xs">

                            {product.stock} in stock
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-primary text-lg">
                            ${product.price}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">
                              ⭐ {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-destructive hover:text-destructive">

                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendorOrders.map((order) =>
                  <Card key={order.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge className={`${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'}`
                          }>
                              <span className="capitalize">{order.status}</span>
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Items</h4>
                            <div className="space-y-2">
                              {order.items.
                            filter((item) => products.find((p) => p.id === item.id)?.vendorId === user?.vendorId).
                            map((item) =>
                            <div key={item.id} className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted">
                                    <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover" />

                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Qty: {item.quantity} × ${item.price}
                                    </p>
                                  </div>
                                </div>
                            )}
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Order Total</p>
                            <p className="text-2xl font-bold text-primary">
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>);

};

export default VendorDashboard;