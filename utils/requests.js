const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
//fetch all vehicles
async function fetchVehicles() {
  try {
    //when domain is not available , return [] otherwise it will throw error
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/vehicles`, {
      cache: "no-store" /* for loadin quick */,
    });
    if (!res.ok) {
      throw new Error("Data Fetch failed");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

//fetch single vehicle
async function fetchVehicle(id) {
  try {
    //when domain is not available , return null otherwise it will throw error
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/vehicles/${id}`);
    if (!res.ok) {
      throw new Error("Data Fetch failed");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchVehicles, fetchVehicle };
