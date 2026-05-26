import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export default function FormBuilderPage({ params }: { params: { id: string } }) {
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
              <div className="w-full max-w-5xl space-y-4">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">Form Builder</h1>
                  <p className="text-sm text-muted-foreground">
                    Editing form <span className="font-medium text-foreground">{params.id}</span>
                  </p>
                </div>

                <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
                  Builder content goes here.
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
