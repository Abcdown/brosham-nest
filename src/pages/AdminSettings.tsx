import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save, Eye, EyeOff } from "lucide-react";
import { getPageSettings, updatePageSettings, type PageSettings } from "@/lib/pageSettings";
import { Badge } from "@/components/ui/badge";

const AdminSettings = () => {
  const [settings, setSettings] = useState<PageSettings>({
    listings: true,
    gallery: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load current settings
    const currentSettings = getPageSettings();
    setSettings(currentSettings);
  }, []);

  const handleToggle = (page: keyof PageSettings) => {
    setSettings((prev) => ({
      ...prev,
      [page]: !prev[page],
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    try {
      updatePageSettings(settings);
      toast({
        title: "Settings saved",
        description: "Page visibility settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const pageConfigs = [
    {
      key: "listings" as keyof PageSettings,
      title: "Property Listings Page",
      description: "Control visibility of the property listings page to public visitors",
      path: "/properties",
    },
    {
      key: "gallery" as keyof PageSettings,
      title: "Gallery Page",
      description: "Control visibility of the property gallery page to public visitors",
      path: "/gallery",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="w-8 h-8" />
            Page Settings
          </h2>
          <p className="text-muted-foreground mt-2">
            Manage which pages are visible to the public
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6">
        {pageConfigs.map((page) => (
          <Card key={page.key} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    {page.title}
                    {settings[page.key] ? (
                      <Badge variant="default" className="bg-green-500">
                        <Eye className="w-3 h-3 mr-1" />
                        Enabled
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <EyeOff className="w-3 h-3 mr-1" />
                        Disabled
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                  <p className="text-sm text-muted-foreground">
                    Page URL: <code className="bg-muted px-2 py-1 rounded">{page.path}</code>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={page.key}
                    checked={settings[page.key]}
                    onCheckedChange={() => handleToggle(page.key)}
                  />
                  <Label htmlFor={page.key} className="sr-only">
                    Toggle {page.title}
                  </Label>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">Current Status:</p>
                {settings[page.key] ? (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <Eye className="w-4 h-4" />
                    <span>Page is visible to all visitors</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                    <EyeOff className="w-4 h-4" />
                    <span>Page shows "Under Construction" message to visitors</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• When a page is disabled, visitors will see an "Under Construction" message</p>
          <p>• Admin users can still access all pages regardless of these settings</p>
          <p>• Changes take effect immediately after saving</p>
          <p>• Don't forget to click "Save Changes" to apply your modifications</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
