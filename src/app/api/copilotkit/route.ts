import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter, // Add this
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";
import { FEDEX_MSA } from "@/lib/fake-msa";
import { PERMISSIONS } from "../v1/permissions";

// 1. Setup the Adapter (This replaces your manual model.generateContent logic)
const serviceAdapter = new GoogleGenerativeAIAdapter({
  model: "gemini-1.5-flash", // Use 1.5 or 2.0 based on your preference
});

// 2. Setup the Runtime
const runtime = new CopilotRuntime({
  actions: ({ properties }) => {
    // Note: Ensure 'userRole' is being passed from your frontend <CopilotKit /> component
    if (!PERMISSIONS.READ_MSA.includes(properties.userRole)) {
      return [];
    }
    return [
      {
        name: "queryVendorMSA",
        description: "Query MSA documents for a specific vendor.",
        parameters: [
          {
            name: "vendorName",
            type: "string", // Added type for clarity
          },
        ],
        async handler({ vendorName }) {
          console.log(`Querying MSA for: ${vendorName}`);
          return FEDEX_MSA;
        },
      },
    ];
  },
});

// 3. Use the standard CopilotKit handler
export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter, // Pass the Gemini adapter here
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};