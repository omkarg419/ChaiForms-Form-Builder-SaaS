import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { CreateFormDialog } from "../create-form-dialog";

export default function FormsPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <main className="flex min-h-[60vh] items-start justify-center p-6">
              <div className="w-full max-w-4xl">
                <h1 className="text-2xl font-semibold tracking-tight">Forms</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  This route is now wired up. Add your form builder content here.
                </p>
                <div className="mb-6">
                  <CreateFormDialog />
                </div>
                {/* Add your form builder components below */}
              </div>
            </main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
