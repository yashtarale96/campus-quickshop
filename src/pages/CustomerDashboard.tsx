import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, Check as CheckCircle, Circle as XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockOrders } from '@/data/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState(mockOrders);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Package className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === 'pending').length,
    deliveredOrders: orders.filter((o) => o.status === 'delivered').length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your orders and account settings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-2xl font-bold">{stats.deliveredOrders}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</p>
                </div>
                <Package className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-heading">Your Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {orders.map((order) =>
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
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1 capitalize">{order.status}</span>
                            </Badge>
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/orders/${order.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                            <div className="space-y-2">
                              {order.items.slice(0, 2).map((item) =>
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
                              {order.items.length > 2 &&
                            <p className="text-xs text-muted-foreground">
                                  +{order.items.length - 2} more items
                                </p>
                            }
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total Amount</p>
                            <p className="text-2xl font-bold text-primary">
                              ${order.total.toFixed(2)}
                            </p>
                            {order.status === 'shipped' &&
                          <p className="text-xs text-muted-foreground mt-1">
                                Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                              </p>
                          }
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {['pending', 'processing', 'shipped', 'delivered'].map((status) =>
              <TabsContent key={status} value={status} className="mt-6">
                  <div className="space-y-4">
                    {orders.
                  filter((order) => order.status === status).
                  map((order) =>
                  <Card key={order.id} className="border-l-4 border-l-primary">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <Button asChild variant="outline" size="sm">
                                <Link to={`/orders/${order.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Link>
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                                <div className="space-y-2">
                                  {order.items.slice(0, 2).map((item) =>
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
                                  {order.items.length > 2 &&
                            <p className="text-xs text-muted-foreground">
                                      +{order.items.length - 2} more items
                                    </p>
                            }
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Total Amount</p>
                                <p className="text-2xl font-bold text-primary">
                                  ${order.total.toFixed(2)}
                                </p>
                                {order.status === 'shipped' &&
                          <p className="text-xs text-muted-foreground mt-1">
                                    Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                  </p>
                          }
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                  )}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>);

};

export default CustomerDashboard;