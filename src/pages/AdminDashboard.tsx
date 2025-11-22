import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Building, Settings, ArrowRight } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Welcome to Admin Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Manage your blog posts and property listings from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Blog Management</CardTitle>
                <CardDescription>
                  Create and manage your blog posts
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Write engaging content to attract potential clients and share market insights.
            </p>
            <Link to="/admin/blog">
              <Button className="w-full">
                Go to Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Building className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <CardTitle>Listing Management</CardTitle>
                <CardDescription>
                  Add and manage property listings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Showcase properties with detailed information and stunning images.
            </p>
            <Link to="/admin/listing">
              <Button variant="secondary" className="w-full">
                Go to Listing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle>Page Settings</CardTitle>
                <CardDescription>
                  Control page visibility and status
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Enable or disable public pages like Listings and Gallery.
            </p>
            <Link to="/admin/settings">
              <Button variant="outline" className="w-full">
                Go to Settings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;