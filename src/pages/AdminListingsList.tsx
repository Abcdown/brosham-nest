import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListingsAPI, type Listing } from "@/lib/listingsApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, Loader2 } from "lucide-react";

const AdminListingsList = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load listings on mount
  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      setIsLoading(true);
      const response = await ListingsAPI.getAll();
      setListings(response.listings);
    } catch (error: any) {
      console.error("Error loading listings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load listings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);
      await ListingsAPI.delete(deleteId);
      
      toast({
        title: "Deleted!",
        description: "Listing has been deleted successfully.",
      });
      
      // Reload listings
      await loadListings();
      setDeleteId(null);
    } catch (error: any) {
      console.error("Error deleting listing:", error);
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete listing",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatPrice = (price: number, currency: string = "RM") => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      sold: "secondary",
      pending: "outline",
    };
    
    return (
      <Badge variant={variants[status] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Property Listings</CardTitle>
              <CardDescription>
                Manage your property listings
              </CardDescription>
            </div>
            <Button onClick={() => navigate("/admin/listing/create")}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Listing
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading listings...</span>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No listings found</p>
              <Button onClick={() => navigate("/admin/listing/create")}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Listing
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Beds/Baths</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        {listing.coverImage ? (
                          <img
                            src={listing.coverImage}
                            alt={listing.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                            <Eye className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {listing.title}
                        {listing.isFeatured && (
                          <Badge variant="secondary" className="ml-2">
                            Featured
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {formatPrice(listing.price, listing.currency)}
                      </TableCell>
                      <TableCell>
                        {listing.city && listing.state ? (
                          <span>{listing.city}, {listing.state}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {listing.bedrooms || 0} bed • {listing.bathrooms || 0} bath
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(listing.listingStatus || "active")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/admin/listing/edit/${listing.id}`)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteId(listing.id!)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the listing
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminListingsList;
